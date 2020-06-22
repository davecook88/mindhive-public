import axios from 'axios';

const API_KEY ='JXVmmb0Zswgjl8Sar9qyesFkatcKHX1OI6TWdGJo';
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export default class UsdaCaller{
  constructor(){
    this.key = API_KEY;
    this.baseUrl = BASE_URL;
  }

  search(query, callback){
    const { key, baseUrl } = this;
    const url = baseUrl + '/foods/search'
    axios.get(url,{
      params:{
        api_key: key,
        query:query,
        pageSize:8,
      }
    })
    .then(res => {
      console.log(res.data);
      callback(res.data);
    })
    .catch(err => callback({error: err}));
  }
}