
interface Slide {
  id?: number;
  title: string;
  description: string;
  backgroundImage: string;
  posterImage: string;
  watchLink: string;
  onclick: () => void; // Function type for onclick
}


import { Movie } from "../Types/Types";

export const slides = [
    {
      title: "Deadpool & Wolverine",
      description: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
      backgroundImage: "https://image.tmdb.org/t/p/original//9l1eZiJHmhr5jIlthMdJN5WYoff.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      watchLink: "/movie/533535"
    },
    {
      title: "It Ends with Us",
      description: "When a woman's first love suddenly reenters her life, her relationship with a charming, but abusive neurosurgeon is upended, and she realizes she must learn to rely on her own strength to make an impossible choice for her future.",
      backgroundImage: "https://image.tmdb.org/t/p/original//9BQqngPfwpeAfK7c2H3cwIFWIVR.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//cSMdFWmajaX4oUMLx7HEDI84GkP.jpg",
      watchLink: "/movie/533536"
    },
    {
      title: "Inside Out 2",
      description: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
      backgroundImage: "https://image.tmdb.org/t/p/original//p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
      watchLink: "/movie/533537"
    },
    {
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    }
  ];

export  const trendingMovies = [
    {
      id:1,
      title: "Deadpool & Wolverine",
      description: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
      backgroundImage: "https://image.tmdb.org/t/p/original//9l1eZiJHmhr5jIlthMdJN5WYoff.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      watchLink: "/movie/533535"
    },
    {
      id:2,
      title: "It Ends with Us",
      description: "When a woman's first love suddenly reenters her life, her relationship with a charming, but abusive neurosurgeon is upended, and she realizes she must learn to rely on her own strength to make an impossible choice for her future.",
      backgroundImage: "https://image.tmdb.org/t/p/original//9BQqngPfwpeAfK7c2H3cwIFWIVR.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//cSMdFWmajaX4oUMLx7HEDI84GkP.jpg",
      watchLink: "/movie/533536"
    },
    {
      id:3,
      title: "Inside Out 2",
      description: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
      backgroundImage: "https://image.tmdb.org/t/p/original//p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
      watchLink: "/movie/533537"
    },
    {
      id:4,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:5,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:6,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:7,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:8,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:9,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:10,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:11,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:12,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:13,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:14,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:16,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:17,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:18,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:19,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:20,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:21,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:22,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:23,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:24,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:25,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:26,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:27,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:28,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:29,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:30,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
    {
      id:31,
      title: "Despicable Me 4",
      description: "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
      backgroundImage: "https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
      posterPath: "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      watchLink: "/movie/533538"
    },
  ];