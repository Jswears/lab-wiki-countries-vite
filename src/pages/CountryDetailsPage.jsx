import axios from 'axios';
import { useEffect } from 'react';
import {useParams } from 'react-router-dom';


function CountryDetails() {

const {countryId} = useParams();
console.log(useParams())
console.log(countryId);
useEffect(()=> {
    const getCountryInfo = async () => {
    const response = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
    }
},[])

    return (
        <h2>Country Details</h2>
    )
}

export default CountryDetails;
