const express  = require("express");
const app = express();
const axios = require('axios');
var cors = require("cors");
app.use(cors());
api_key="227d08eb2c46d0555e697f42bf48e689"

app.get("/current",(req,res)=>{
    const curr_playing_movie_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`
    // const requestFour = axios.get(curr_playing_movie_url);
    axios.get(curr_playing_movie_url).then((response)=>{
        curr_playing_m = response
        // final = {}
        semi = []
        var answer = {}
        count = 0
        console.log(curr_playing_m)
        for (i = 0; i < curr_playing_m.data.results.length;i++)
        {
            if (curr_playing_m.data.results[i]['backdrop_path'] != null)
            {
            answer = {}
            answer['id'] = curr_playing_m.data.results[i]['id']
            answer['backdrop_path'] =  curr_playing_m.data.results[i]['backdrop_path']
            answer['name'] = curr_playing_m.data.results[i]['title']
            count ++

            if (count == 6)
            {
                break
            }
            semi.push(answer)
        }}
    
    // final["currently_playing_movies"] = semi

        res.send(semi)
    })
})


app.get("/search",(req,res)=>{
    // var search_key = req.params.
    var search_key = req.query.id;
    const seach_url = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}& language=en-US&query=${search_key}`
    // console.log(search_key)
    axios.get(seach_url).then((response)=>{
        search = response
        // final = {}
        semi = []
        var answer = {}
        count = 0
        // console.log(search)
        for (i = 0; i < search.data.results.length;i++)
        {
            answer = {}

            if ((search.data.results[i]['media_type'] == 'tv' || search.data.results[i]['media_type'] == 'movie' )&& search.data.results[i]['backdrop_path'] != null)
            {
                count ++ 
                
                answer['id'] = search.data.results[i]['id']
                answer['backdrop_path'] =  search.data.results[i]['backdrop_path']
                answer['media_type'] = search.data.results[i]['media_type']
                if (search.data.results[i]['media_type'] == 'tv' )
                {
                    answer['name'] = search.data.results[i]['name']
                }

                if (search.data.results[i]['media_type'] == 'movie' )
                {
                    answer['name'] = search.data.results[i]['title']
                }

                if (count == 8)
            {
                break
            }
            semi.push(answer)

            }
            

            
            
        }
    
    // final["currently_playing_movies"] = semi

        res.send(semi)
    })
})





app.get("/",(req,res)=>{
    console.log("called")
    const seach_url = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}& language=en-US&query=game`
    const trending_movie_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`
    const top_rated_movie_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`
    const curr_playing_movie_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`
    const popular_movie_url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    const trending_tv_url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`
    const top_rated_tv_url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`
    const popular_tv_url = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
    


    const requestOne = axios.get(seach_url);
    const requestTwo = axios.get(trending_movie_url);
    const requestThree = axios.get(top_rated_movie_url);
    const requestFour = axios.get(curr_playing_movie_url);
    const requestFive = axios.get(popular_movie_url);
    const requestSix = axios.get(trending_tv_url)
    const requestSeven = axios.get(top_rated_tv_url)
    const requestEight = axios.get(popular_tv_url)

    
    axios.all([requestOne, requestTwo, requestThree,requestFour,requestFive,requestSix,requestSeven,requestEight]).then(axios.spread((search,trending_m,top_rated_m,
        curr_playing_m,popular_m,trending_tv,top_rated_tv,popular_tv) => {
        
    // ****   search  ****



    final = {}

    semi = []
    var answer = {}
    count = 0
    // for (i = 0; i < search.data.results.length;i++)
    // {
    //     answer = {}
    //     answer['id'] = search.data.results[i]['id']
    //     answer['backdrop_path'] =  search.data.results[i]['backdrop_path']

    //     if (search.data.results[i]['media_type'] == 'tv' || search.data.results[i]['media_type'] == 'movie')
    //     {
    //         count ++ 
    //         if (search.data.results[i]['media_type'] == 'tv' )
    //         {
    //             answer['name'] = search.data.results[i]['name']
    //         }

    //         if (search.data.results[i]['media_type'] == 'movie' )
    //         {
    //             answer['name'] = search.data.results[i]['title']
    //         }
    //     }

    //     if (count == 5)
    //     {
    //         break
    //     }
    //     semi.push(answer)
    // }
    
    // final["search"] = semi
    // res.send(final)
    

    //   **** trending movies  **** 

    semi = []
    var answer = {}
    count = 0
    for (i = 0; i < trending_m.data.results.length;i++)
    {
        answer = {}
        answer['id'] = trending_m.data.results[i]['id']
        answer['poster_path'] =  trending_m.data.results[i]['poster_path']
        count ++ 
        answer['name'] = trending_m.data.results[i]['title']
           
        

        if (count == 5)
        {
            break
        }
        semi.push(answer)
    }
    
    final["trending_movies"] = semi
    // res.send(final)


    // ****  top rated movies  **** 

    semi = []
    var answer = {}
    count = 0
    for (i = 0; i < top_rated_m.data.results.length;i++)
    {
        answer = {}
        answer['id'] = top_rated_m.data.results[i]['id']
        answer['poster_path'] =  top_rated_m.data.results[i]['poster_path']

        count ++ 
        answer['name'] = top_rated_m.data.results[i]['title']
           
        if (count == 5)
        {
            break
        }
        semi.push(answer)
    }
    
    final["top_rated_movies"] = semi
    // res.send(final)
    //   ****     Currently Playing Movies      ****

    semi = []
    var answer = {}
    count = 0
    for (i = 0; i < curr_playing_m.data.results.length;i++)
    {
        answer = {}
        answer['id'] = curr_playing_m.data.results[i]['id']
        answer['poster_path'] =  curr_playing_m.data.results[i]['poster_path']

        count ++ 
        answer['name'] = curr_playing_m.data.results[i]['title']
           

        if (count == 5)
        {
            break
        }
        semi.push(answer)
    }
    
    final["currently_playing_movies"] = semi



    //   ****     Popular movies      ****

    semi = []
    var answer = {}
    count = 0
    for (i = 0; i < popular_m.data.results.length;i++)
    {
        answer = {}
        answer['id'] = popular_m.data.results[i]['id']
        answer['poster_path'] =  popular_m.data.results[i]['poster_path']

        count ++ 
        answer['name'] = popular_m.data.results[i]['title']
           

        if (count == 5)
        {
            break
        }
        semi.push(answer)
    }
    
    final["popular_movies"] = semi
    

    //   ****      Trending TV     ****

    semi = []
    var answer = {}
    count = 0
    for (i = 0; i < trending_tv.data.results.length;i++)
    {
        answer = {}
        answer['id'] = trending_tv.data.results[i]['id']
        answer['poster_path'] =  trending_tv.data.results[i]['poster_path']
        count ++ 
        answer['name'] = trending_tv.data.results[i]['name']

        if (count == 6)
        {
            break
        }
        semi.push(answer)
    }
    
    final["trending_tv"] = semi
    // // res.send(final)
      
    
    //     ****  Top Rated TV     ****

    semi = []
    var answer = {}
    count = 0
    for (i = 0; i < top_rated_tv.data.results.length;i++)
    {
        answer = {}
        answer['id'] = top_rated_tv.data.results[i]['id']
        answer['poster_path'] =  top_rated_tv.data.results[i]['poster_path']

        count ++ 
        answer['name'] = top_rated_tv.data.results[i]['name']
        if (count == 5)
        {
            break
        }
        semi.push(answer)
    }
    
    final["top_rated_tv"] = semi 

    // //    ****   Popular tv shows    ****
    semi = []
    var answer = {}
    count = 0
    for (i = 0; i < popular_tv.data.results.length;i++)
    {
        answer = {}
        answer['id'] = popular_tv.data.results[i]['id']
        answer['poster_path'] =  popular_tv.data.results[i]['poster_path']

        count ++ 
        answer['name'] = popular_tv.data.results[i]['name']
            

        

        if (count == 5)
        {
            break
        }
        semi.push(answer)
    }
    
    final["popular_tv"] = semi 
    res.send(semi)

    })
    )
});







app.get("/watch/movie",(req,res)=>{
    // req.query['id']


    console.log(req.query['id'])
    const reco_movie_url = `https://api.themoviedb.org/3/movie/464052/recommendations?api_key=${api_key}&language=en-US&page=1`
    const similar_movie_url = `https://api.themoviedb.org/3/movie/464052/similar?api_key=${api_key}&language=en-US&page=1`
    const video_movie_url = `https://api.themoviedb.org/3/movie/464052/videos?api_key=${api_key}&language=en-US&page=1`
    const details_movie_url = `https://api.themoviedb.org/3/movie/464052?api_key=${api_key}&language=en-US&page=1`
    const reviews_movie_url = `https://api.themoviedb.org/3/movie/464052/reviews?api_key=${api_key}&language=en-US&page=1`
    const cast_movie_url = `https://api.themoviedb.org/3/movie/464052/credits?api_key=${api_key}&language=en-US&page=1`

    const requestOne = axios.get(reco_movie_url);
    const requestTwo = axios.get(similar_movie_url);
    const requestThree = axios.get(video_movie_url);
    const requestFour = axios.get(details_movie_url);
    const requestFive = axios.get(reviews_movie_url);
    const requestSix = axios.get(cast_movie_url)

    axios.all([requestOne, requestTwo, requestThree,requestFour,requestFive,requestSix]).then(axios.spread((reco_m,similar_m,
        video_m,details_m,reviews_m,cast_m) => {
            //   *****     recommended movies     ****
            final = {}
            semi = []
            var answer = {}
            count = 0
            for (i = 0; i < reco_m.data.results.length;i++)
            {
                answer = {}
                answer['id'] = reco_m.data.results[i]['id']
                answer['backdrop_path'] =  reco_m.data.results[i]['backdrop_path']
                answer['name'] = reco_m.data.results[i]['title']
                count ++ 
                
                if (count == 5)
                {
                    break
                }
                semi.push(answer)
            }
            
            final["recommended_movies"] = semi


            //  ******           Similar movies       *********

            semi = []
            var answer = {}
            count = 0
            for (i = 0; i < similar_m.data.results.length;i++)
            {
                answer = {}
                answer['id'] = similar_m.data.results[i]['id']
                answer['backdrop_path'] =  similar_m.data.results[i]['backdrop_path']
                answer['name'] = similar_m.data.results[i]['title']
                count ++ 
                
                if (count == 5)
                {
                    break
                }
                semi.push(answer)
            }
            
            final["similar_movies"] = semi

            //    *******      Trailers    ********

            semi = []
            var answer = {}
            count = 0
            for (i = 0; i < video_m.data.results.length;i++)
            {
                answer = {}
                answer['site'] = video_m.data.results[i]['site']
                answer['type'] =  video_m.data.results[i]['type']
                answer['name'] = video_m.data.results[i]['name']
                answer['key'] = video_m.data.results[i]['key']
                count ++ 
                
                if (count == 5)
                {
                    break
                }
                semi.push(answer)
            }
            
            final["trailer"] = semi


            //    ******     Movie Details     *****

            semi = []
            var answer = {}
            answer['title'] = details_m.data.title
            answer['release_date'] =  details_m.data.release_date
            answer['runtime'] = details_m.data.runtime
            answer['overview'] = details_m.data.overview
            answer['vote_average'] = details_m.data.vote_average
            answer['tagline'] = details_m.data.tagline


            temp = []
            for (i = 0;i < details_m.data.genres.length;i++)
            {
                temp.push(details_m.data.genres[i].name)
            }
            answer['genres'] = temp
            

            temp = []
            for (i = 0;i < details_m.data.spoken_languages.length;i++)
            {
                temp.push(details_m.data.spoken_languages[i].name)
            }
           answer['spoken_languages'] = temp
           final["movie_details"] = answer


            //      ******      Movie Reviews     *********

            semi = []
            var answer = {}

            for (i = 0;i< reviews_m.data.results.length;i++)
            {

                if (i == 5)
                    break
            answer['author'] = reviews_m.data.results[i].author
            answer['content'] =  reviews_m.data.results[i].content
            answer['created_at'] = reviews_m.data.results[i].created_at
            answer['url'] = reviews_m.data.results[i].url
            answer['rating'] = reviews_m.data.results[i].author_details.rating
            answer['avatar_path'] = reviews_m.data.results[i].author_details.avatar_path
            semi.push(answer)
            }

            final["movie_reviews"] = semi

            //      *******    Movie Cast

           res.send(semi)



})
)
});



app.listen(3000,function(){
        console.log("Server is running on port 3000");
    })