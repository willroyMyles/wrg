import {fetchGraphql} from 'react-tinacms-strapi'

export const processEnv= {
    slack : process.env.REACT_APP_SLACK,
    strapi : process.env.REACT_APP_STRAPI_URL || "",

}

export const getAllAuthors = async () => new Promise(async (resolve, reject)=>{
    const results = await fetchGraphql(processEnv.strapi, `query{
        authors{
       id
       title
       about
     }
   }`);

   console.log(results.data.authors[0].title);
   

   return resolve({allAuthors : results.data.authors[0].title})
})

export const getAllCategories = () => new Promise<any[]>(async (resolve, reject)=>{
    const cat = "categories"
    const results = await fetchGraphql(processEnv.strapi,`query{
        ${cat}{
       id
       title
       sub
     }
   }` );

   return resolve(results.data.categories)
})

