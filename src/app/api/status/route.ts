import { NextResponse } from "next/server";

// UptimeRobot API v2 endpoint
const UPTIMEROBOT_API = "https://api.uptimerobot.com/v2/getMonitors";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const apiKey = process.env.UPTIMEROBOT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "UptimeRobot API key not configured",
        monitors: [],
        overall_status: "unknown",
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(UPTIMEROBOT_API, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_key: apiKey,
        format: "json",
        logs: "1",
        log_types: "1-2", // Down and Up events
        logs_limit: "10",
        response_times: "1",
        response_times_average: "30", // 30-min averages
        custom_uptime_ratios: "1-7-30-90", // 1d, 7d, 30d, 90d
        all_time_uptime_ratio: "1",
      }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`UptimeRobot API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.stat !== "ok") {
      throw new Error(data.error?.message || "UptimeRobot API error");
    }

    // Transform the data into a clean format
    const monitors = (data.monitors || []).map((monitor: UptimeRobotMonitor) => {
      const uptimeRatios = (monitor.custom_uptime_ratio || "").split("-");
      const responseTimes = (monitor.response_times || []).map(
        (rt: { datetime: number; value: number }) => ({
          timestamp: rt.datetime,
          value: rt.value,
        })
      );

      // Calculate average response time from recent data
      const avgResponseTime =
        responseTimes.length > 0
          ? Math.round(
              responseTimes.reduce(
                (sum: number, rt: { value: number }) => sum + rt.value,
                0
              ) / responseTimes.length
            )
          : 0;

      return {
        id: monitor.id,
        name: monitor.friendly_name,
        url: monitor.url,
        status: getStatusLabel(monitor.status),
        statusCode: monitor.status,
        uptime: {
          day: parseFloat(uptimeRatios[0] || "0"),
          week: parseFloat(uptimeRatios[1] || "0"),
          month: parseFloat(uptimeRatios[2] || "0"),
          quarter: parseFloat(uptimeRatios[3] || "0"),
          allTime: parseFloat(monitor.all_time_uptime_ratio || "0"),
        },
        responseTime: {
          average: avgResponseTime,
          history: responseTimes.slice(0, 48), // Last 24h at 30-min intervals
        },
        logs: (monitor.logs || []).map(
          (log: { type: number; datetime: number; duration: number; reason?: { code: string; detail: string } }) => ({
            type: log.type === 1 ? "down" : "up",
            timestamp: log.datetime,
            duration: log.duration,
            reason: log.reason?.detail || "",
          })
        ),
      };
    });

    // Determine overall status
    const hasDown = monitors.some(
      (m: TransformedMonitor) => m.statusCode === 9 || m.statusCode === 8
    );
    const hasPaused = monitors.some(
      (m: TransformedMonitor) => m.statusCode === 0
    );
    const overallStatus = hasDown
      ? "major_outage"
      : hasPaused
        ? "degraded"
        : "operational";

    return NextResponse.json({
      monitors,
      overall_status: overallStatus,
      checked_at: Date.now(),
      monitor_count: monitors.length,
    });
  } catch (error) {
    console.error("UptimeRobot API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch monitoring data",
        monitors: [],
        overall_status: "unknown",
      },
      { status: 500 }
    );
  }
}

function getStatusLabel(status: number): string {
  switch (status) {
    case 0:
      return "paused";
    case 1:
      return "not_checked";
    case 2:
      return "up";
    case 8:
      return "seems_down";
    case 9:
      return "down";
    default:
      return "unknown";
  }
}

// Types for UptimeRobot API response
interface UptimeRobotMonitor {
  id: number;
  friendly_name: string;
  url: string;
  status: number;
  custom_uptime_ratio: string;
  all_time_uptime_ratio: string;
  response_times: { datetime: number; value: number }[];
  logs: {
    type: number;
    datetime: number;
    duration: number;
    reason?: { code: string; detail: string };
  }[];
}

interface TransformedMonitor {
  statusCode: number;
}
