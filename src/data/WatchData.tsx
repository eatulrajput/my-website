interface WatchProps {
    id:number,
    name:string,
    type:string,
    imageSrc:string,
}

export const Watch: WatchProps[] = [
    
    // Documentary
    {
        id:1,
        name: "Social Dilemma",
        type:"Documentary",
        imageSrc:"/images/watch/documentary/social_dilemma.webp"
    },
    {
        id:2,
        name: "Sea Piracy",
        type:"Documentary",
        imageSrc:"/images/watch/documentary/sea_piracy.webp"
    },

    // Movie
    {
        id:3,
        name:"La La Land",
        type:"Movie",
        imageSrc:"/images/watch/movie/la_la_land.webp",
    },

    // anime
    {
        id:4,
        name:"Kengan Asura",
        type:"anime",
        imageSrc:"/images/watch/anime/kengan_asura.webp",
    },
    
    {
        id:5,
        name:"Attack On Titan",
        type:"anime",
        imageSrc:"/images/watch/anime/attack_on_titan.webp",
    },

    {
        id:6,
        name:"Death Note",
        type:"anime",
        imageSrc:"/images/watch/anime/death_note.webp",
    }



]