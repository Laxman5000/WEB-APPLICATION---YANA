import React, { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import {Loading } from "../macros/Loading";
const CR = () => {
    const [src,setSrc] = useState("USD");
    const [countryRates,setCR] = useState([]);
    const [info,setInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const options = {
      filterType: 'checkbox',
    };

    const columns = [
      {
        name: "country",
        label: "Country",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "rate",
        label: "Rate",
        options: {
          filter: false,
          sort: true,
      }
      },
    ];


    useEffect(() =>{
           Data(src);
    },[src]);

    useEffect(()=>{
        setLoading(true);
        let data = [];
        Object.keys(countryRates)
        .map(key => data.push(
            {
                country:key,
                rate: countryRates[key]
            }
            ))
           setInfo(data);
          setLoading(false);
    },[countryRates])

    
    async function Data(src){
       console.log(src);
            setLoading(true);
                 await axios({
                    method: 'get',
                    url: `https://v1.nocodeapi.com/twonty/cx/nBoNPMcrQCUvmOfv/rates?api_key=UlBjKbXwuRGQIXLNB&source=${src}`, 
                }).then(function (response) {
                       setCR(response.data.rates);
                       setLoading(false);
                }).catch(function (error) {
                        // handle error
                        console.log(error);
                })
               
    }

   

const filter = (event) => {
    let srcmew = event.target.value;
    setSrc(srcmew);
    // Data(src);
}
       console.log(info)
        return(
               <div className="container-fluid currency_table_wrap">
                  <Loading loading={loading} />
                   <h3>Select Source:</h3>
                   <select onChange={filter} value={src} className="form-control">
                        {Object.keys(countryRates).map((opt,i) => <option value={opt} key={i}>{opt}</option>)}
                   </select>
                   <MUIDataTable 
                   title={"Currency Rates"}
                   data={info}
                   className="mt-5"
                   columns={columns}
                   options={options} />
                </div> 
        )           
    }
export default CR;