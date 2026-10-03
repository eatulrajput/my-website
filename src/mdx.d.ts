declare module "*.mdx" {
  import { MDXContent } from "mdx/types";

  const MDXComponent: MDXContent;
  export default MDXComponent;
}
