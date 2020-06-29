import React from 'react';

import { Cards, Chart, CountryPicker } from './components';

import styles from './App.module.css';
import { fetchData } from './api';
import background from './images/image.png';

class App extends React.Component {
    // Create a state
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            country: "",
        }
    }

    // Fetch data from API
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    // Change country handle
    handleChangeCountry = async (country) => {
        // Fetch data
        const fetchedData = await fetchData(country);
        // Set the state
        this.setState({ data: fetchedData, country: country })
    }

    render() {

        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={background} alt="COVID" />
                <h1 className={styles.title}>Tracker</h1>
                <h2 className={styles.describle}>COVID-19 global data from JHU CSSE for now (with mathdroid API)</h2>
                <Cards data={data} />
                <CountryPicker handleChangeCountry={this.handleChangeCountry} />
                <Chart data={data} country={country} />
                <p className={styles.describle}>Made by TCT with JavaScript Mastery tutorial</p>
            </div>
        )
    }
}

export default App;
