import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Checkbox, Chip, Container, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Skeleton, TextField, Tooltip, Typography } from "@mui/material";
import GM from './morning.webp';
import AM from './afternoon.png';
import PM from './night.png';
import Moment from "react-moment";
import { Box } from "@mui/system";
import ListItemIcon from '@mui/material/ListItemIcon';
import ClearIcon from '@mui/icons-material/Clear';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useGetNewsQuery } from "./services/newsApi";
import NewspaperIconOutline from '@mui/icons-material/NewspaperOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGetBooksQuery, getRandomColor } from "./services/BookApi";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { useGetQuotesQuery } from "./services/QuotesApi";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useGetCountryRatesQuery, iconList, currencyState } from "./services/CurrencyApi";
import { deepOrange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "./services/AuthApi";
import { notificationSelector, setCordinates } from "./services/PwaService";
import usePushNotifications from "./usePushNotifications";
import { useGetWeatherQuery } from "./services/WeatherApi";
import { todoSelector, addTodo, createTodoItem, toggleTodoItem, deleteTodoItem, getUserTodo, saveTodo,refresh } from "./services/todoApi";
import Axios from "axios";
import Join from "./components/Chat/Join";



function Welcome() {
    const { full_name, isLoggedIn } = useSelector(userSelector)
    const { pushServerSubscriptionId, cordinates } = useSelector(notificationSelector);
    const { onClickSendNotification } = usePushNotifications();
    const { todoitems, raw } = useSelector(todoSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (pushServerSubscriptionId && !isLoggedIn) {
            onClickSendNotification(pushServerSubscriptionId, {
                title: "Login to sync your data",
                body: "This is a notification from the app",
                image: "/images/square.png",
                tag: "new-product",
                url: "login"
            });
        }
    }, [isLoggedIn, pushServerSubscriptionId]);

    const time = new Date();
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    const [headerStyle, setheaderStyle] = useState({});
    const { data: newsData, isFetching: newsDataFetching, isError } = useGetNewsQuery();
    const { data: bookData, isFetching: bookDataFetching, isError: bookDataError } = useGetBooksQuery();
    const { data: quoteData, isFetching: quoteDataFetching, isError: quoteDataError } = useGetQuotesQuery();
    const { data: countryRatesData, isFetching: countryRatesDataFetching, isError: countryRatesDataError } = useGetCountryRatesQuery();
    const [covidData, setCovidData] = useState({});
    const [cLoading, setCLoading] = useState(true);
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://covid-19-statistics.p.rapidapi.com/reports/total',
            params: { date: '2022-04-01' },
            headers: {
                'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com',
                'X-RapidAPI-Key': '4c867d69ccmsh0bdd9cea6e20c70p15487cjsn0dd816841b19'
            }
        };

        Axios.request(options).then(function (response) {
            setCovidData(response.data.data);
            setCLoading(false);
        }).catch(function (error) {
            console.error(error);
        });
        var today = new Date(),
            curTime = today.getHours();

        if (curTime >= 0 && curTime < 12) {
            setImage(GM);
            setText("Good Morning!");
            setheaderStyle({ background: '#f5f5f5' });
        }
        else if (curTime >= 12 && curTime < 17) {
            setImage(AM);
            setText("Good Afternoon!");
            setheaderStyle({ background: 'rgb(250 239 236)' });

        }
        else if (curTime >= 17 && curTime < 24) {
            setImage(PM);
            setText("Good Evening!");
            setheaderStyle({ background: 'rgb(0 0 0)', color: 'white' });

        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success function
                res => dispatch(setCordinates(res.coords)),
                // Error function
                null,
                // Options. See MDN for details.
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
        }

        getUserTodo().then((res)=>{
            saveTodo(res)
            dispatch(refresh(res));
        });
       
    }, []);

    const { data: weatherData, isFetching: weatherDataFetching, isError: weatherDataError } = useGetWeatherQuery(cordinates);

    return (
        <Container>
            <div className="welcome-wrapper">
                {/* hero section starts */}
                <Paper style={headerStyle}>
                    <div className="welcome-hero">
                        <div className="welcome-hero-text">
                            <h1>{text}</h1>
                            <Typography variant="h6" component="h3">
                                {full_name}
                            </Typography>
                            <Typography variant="h6" component="span">
                                <Moment format="D MMM YYYY" >
                                    {time}
                                </Moment>
                            </Typography>

                        </div>

                        <div className="welcome-hero-image" style={{ backgroundImage: `url(${image})` }}></div>
                    </div>
                </Paper>
                {/* hero section ends */}
                <main className="welcome-second-section">
                    {/* weather section */}
                    <Paper style={{ padding: 10 }} className="todo-wrapper second-section-card">
                        <div className="d-flex">
                            <h4>Today's Weather</h4>
                            {weatherDataFetching ?
                                <div className="skleton d-flex">
                                    <Skeleton variant="text" width={40} />
                                </div> :
                                <Link to="/weather"> More </Link>
                            }
                        </div>
                        <Divider />
                        {weatherDataFetching &&
                            <div className="skleton d-flex">
                                <Skeleton variant="text" height={30} width="90%" animation="wave" />
                                <Skeleton variant="text" height={20} width="90%" animation="wave" />
                            </div>
                        }
                        {weatherDataError && <div>Error</div>}
                        {weatherData && <div className="weather-list-homepage-wrapper">
                            <div className="weather-list-homepage">
                                <div className="weather-list-homepage-text">
                                    <h5>{weatherData.timezone}</h5>
                                    <div className="weather-list-homepage-iconsection d-flex">
                                        <div className="weather-list-homepage-icon">
                                            <img src={`https://www.weatherbit.io/static/img/icons/${weatherData.current.weather[0].main[0].toLowerCase()}${weatherData.current.weather[0].icon}.png`} alt="weather" />
                                        </div>
                                        <div className="weather-list-homepage-temp">
                                            <span className="current_weather_text"> {(weatherData.current.temp - 273.15).toFixed(2)}&deg;C </span>
                                            <span>{weatherData.current.weather[0].description} </span>
                                            <span>Feels like: {(weatherData.current.feels_like - 273.15).toFixed(2)}&deg;C </span>
                                            <span>sunrise: {new Date(weatherData.current.sunrise).toLocaleTimeString()}</span>
                                            <span>sunset: {new Date(weatherData.current.sunset).toLocaleTimeString()}</span>
                                        </div>
                                    </ div>
                                    <Typography variant="subtitle2" display="flex" alignItems="center" justifyContent="space-between" color="#2696a8" gutterBottom>

                                    </Typography>

                                    <Typography variant="caption" display="flex" alignItems="center" justifyContent="space-between" gutterBottom>
                                        <Tooltip title="Pressure">
                                            <span className="d-flex"><img src="https://img.icons8.com/small/16/36b999/barometer.png" /> {weatherData.current.pressure} </span>
                                        </Tooltip>
                                        <Tooltip title="Humidity">
                                            <span className="d-flex"><img src="https://img.icons8.com/small/16/36b999/humidity.png" /> {weatherData.current.humidity}% </span>
                                        </Tooltip>
                                        <Tooltip title="Wind Speed">
                                            <span className="d-flex"><img src="https://img.icons8.com/small/16/36b999/wind.png" /> {weatherData.current.wind_speed} m/s </span>
                                        </Tooltip>
                                        <Tooltip title="Cloudiness">
                                            <span className="d-flex"><img src="https://img.icons8.com/small/16/36b999/cloud.png" /> {weatherData.current.clouds}% </span>
                                        </Tooltip>
                                        <Tooltip title="Visibility">
                                            <span className="d-flex"><img src="https://img.icons8.com/small/16/36b999/sun.png" /> {weatherData.current.visibility} km </span>
                                        </Tooltip>
                                        <Tooltip title="Wind Degree">
                                            <span className="d-flex"><img src="https://img.icons8.com/small/16/36b999/wind-speed-58-62.png" />  {weatherData.current.wind_deg} </span>
                                        </Tooltip>
                                        <Tooltip title="Dew Point">
                                            <span className="d-flex"><img src="https://img.icons8.com/small/16/36b999/dew-point.png" />{weatherData.current.dew_point}</span>
                                        </Tooltip>
                                    </Typography>
                                </div>
                            </div>
                        </div>}

                    </Paper>
                    {/* weather section ends */}
                    {/* todo section */}
                    <Paper style={{ padding: 10 }} className="todo-wrapper second-section-card">
                        <div className="d-flex">
                            <h4>Your To Do</h4>
                            {newsDataFetching ? <div className="skleton d-flex">
                                <Skeleton variant="text" width={40} />

                            </div> : null
                            }
                            {/* { sync.syncStatus && <small className="text-success">Synced</small> } */}
                        </div>
                        <Divider />
                        <Box>
                            <List dense={true}>
                                {todoitems.length > 0 && todoitems?.slice(-5).map((value) =>
                                    <ListItem
                                        key={value._id || value.id + Math.random()}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments" onClick={() => dispatch(deleteTodoItem(value.id))}>
                                                <ClearIcon style={{ color: 'red' }} />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={value.completed}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': value }}
                                                    onClick={() => dispatch(toggleTodoItem(value.id))}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={8} primary={value.title} />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                                <ListItem
                                    key={1}
                                    disablePadding
                                    style={{ width: '100%' }}
                                    alignItems="center"
                                >
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Add a todo"
                                        multiline
                                        maxRows={4}
                                        value={raw.title || ''}
                                        size="small"
                                        style={{ width: '100%' }}
                                        onChange={(e) => dispatch(createTodoItem(e.target.value))}
                                    />

                                    <LoadingButton
                                        edge="end" aria-label="comments" style={{ marginLeft: '-90px', padding: 0 }}
                                        onClick={(e) => dispatch(addTodo())}
                                        endIcon={<SendIcon />}
                                        // loading={loading}
                                        loadingPosition="end"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                    >
                                        Add
                                    </LoadingButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Paper>
                    {/* todo section ends */}
                    {/* news section */}
                    <Paper style={{ padding: 10 }} className="todo-wrapper second-section-card">
                        <div className="d-flex">
                            <h4>Recent News</h4>
                            {newsDataFetching ?
                                <div className="skleton d-flex">
                                    <Skeleton variant="text" width={40} />
                                </div> :
                                <Link to="/news"> Read More </Link>
                            }
                        </div>
                        <Divider />
                        {newsDataFetching && [1, 2, 3].map((value) => <div className="skleton d-flex" key={value}>
                            <Skeleton variant="rectangular" width={70} height={70} />
                            <Skeleton variant="text" height={100} width="80%" animation="wave" />
                        </div>)
                        }
                        {isError && <div>Error</div>}
                        {newsData && newsData.results.slice(-3).map((news) => {

                            return <a href={news.url} className="news-list-homepage-links" key={news.id} target="_blank" rel="noopener noreferrer" >
                                <div className="news-list-homepage">
                                    <LazyLoadImage
                                        src={news.media[0] ? news.media[0]['media-metadata'][0].url : ""}
                                        alt={news.media[0] ? news.media[0].caption : "NewsImage"}
                                        width={70}
                                        height={70}
                                        effect="blur"

                                    />
                                    <div className="news-list-homepage-text">
                                        <h5>{news.title}</h5>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {news.byline}
                                        </Typography>
                                        <div className="news-list-homepage-text-date">
                                            <Typography variant="caption" display="flex" gutterBottom>
                                                <NewspaperIconOutline style={{ fontSize: '20px', marginRight: '4px' }} /> {news.source}
                                            </Typography>
                                            <Typography variant="caption" display="flex" gutterBottom>
                                                <EventNoteIcon style={{ fontSize: '20px', marginRight: '4px' }} /> {news.published_date}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        })}
                    </Paper>
                    {/* news section ends */}
                    {/* books section */}
                    <Paper style={{ padding: 10 }} className="todo-wrapper second-section-card">
                        <div className="d-flex">
                            <h4>Books to read</h4>
                            {bookDataFetching ?
                                <div className="skleton d-flex">
                                    <Skeleton variant="text" width={40} />
                                </div> :
                                <Link to="/books"> Read More </Link>
                            }
                        </div>
                        <Divider />
                        <div className="book-list-homepage-wrapper">
                            {bookDataFetching && [1, 2, 3, 4].map((value) => <div className="book-list-homepage" key={value}>
                                <Skeleton variant="rectangular" width={70} height={70} />
                                <div className="d-skeleton-book">
                                    <Skeleton variant="text" height={30} width="90%" animation="wave" />
                                    <Skeleton variant="text" height={20} width="90%" animation="wave" />
                                    <Skeleton variant="text" height={20} width="90%" animation="wave" />
                                </div>
                            </div>)
                            }
                            {bookDataError && <div>Error</div>}
                            {bookData && bookData.results.lists.slice(-4).map((book) => {
                                const img = book.books[0] && book.books[0]["book_image"]
                                return (
                                    <div className="book-list-homepage" key={book.list_id}>
                                        <LazyLoadImage
                                            src={img || ""}
                                            alt={book.books[0] ? book.books[0].title : "BookImage"}
                                            width={70}
                                            height={70}
                                            effect="blur"
                                        />
                                        <div className="news-list-homepage-text">
                                            <Chip color={getRandomColor()} size="small" label={book ? book.display_name : ""} style={{ height: '15px', fontSize: '10px', width: '80%' }} className="book-chip" />
                                            <h5>{book.books[0].title}</h5>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {book.books[0].contributor}
                                            </Typography>
                                            <div className="news-list-homepage-text-date">
                                                <Typography variant="caption" display="flex" gutterBottom>
                                                    <LibraryBooksOutlinedIcon style={{ fontSize: '20px', marginRight: '4px' }} /> {book.books[0].publisher}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Paper>
                    {/* books section ends */}
                    {/* quotes section */}
                    <Paper style={{ padding: 10 }} className="todo-wrapper second-section-card">
                        <div className="d-flex">
                            <h4>Quotes</h4>
                            {quoteDataFetching ?
                                <div className="skleton d-flex">
                                    <Skeleton variant="text" width={40} />
                                </div> :
                                <Link to="/quotes"> Read More </Link>
                            }
                        </div>
                        <Divider />
                        {quoteDataFetching && [1, 2, 3].map((value) => <div className="skleton d-flex" key={value}>
                            <Skeleton variant="rectangular" width={70} height={70} />
                            <Skeleton variant="text" height={100} width="80%" animation="wave" />
                        </div>)
                        }
                        {quoteDataError && <div>Error</div>}
                        {quoteData && quoteData.slice(-4).map((quote, index) => {
                            return <div className="quote-list-homepage" key={index + Math.random()}>
                                <div className="quote-list-homepage-text">
                                    <h5>{quote.text}</h5>
                                    <Typography variant="caption" display="flex" alignItems="center" color="#2696a8" gutterBottom>
                                        <AccountBoxOutlinedIcon fontSize="18px" /> {quote.author}
                                    </Typography>
                                </div>
                                <Divider />
                            </div>
                        })}
                    </Paper>
                    {/* quotes section ends */}


                    {/* currency section */}
                    <Paper style={{ padding: 10 }} className="todo-wrapper second-section-card">
                        <div className="d-flex">
                            <h4>Currency</h4>
                            {countryRatesDataFetching ? <div className="skleton d-flex">
                                <Skeleton variant="text" width={40} />
                            </div> : <Link to="/currency"> All Currencies </Link>
                            }
                        </div>
                        <Divider />
                        <div className="rates-list-homepage-wrapper">
                            <div className="rates-list-skeleton-wrapper">
                                {countryRatesDataFetching && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) =>
                                    <div className="rates-list-skeleton" key={value}>
                                        <Skeleton variant="rectangular" width='90%' height={70} />
                                    </div>)
                                }
                            </div>
                            {countryRatesDataError && <div>Error</div>}
                            <div className="d-flex">
                                {countryRatesData && Object.keys(countryRatesData?.rates).map((rateKey) => {

                                    return (
                                        <div className="rates-list-homepage" key={countryRatesData?.rates[rateKey]}>

                                            <div className="news-list-homepage-text d-flex">
                                                <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
                                                    {iconList[rateKey]}
                                                </Avatar>
                                                <div className="rates-list-homepage-text-text">
                                                    <h5> {rateKey}</h5>
                                                    <Typography variant="caption" display="block" gutterBottom>
                                                        {countryRatesData?.rates[rateKey]}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Typography variant="caption" display="block" gutterBottom>
                                All rates are {currencyState.state} equivalent
                            </Typography>
                        </div>
                    </Paper>
                    {/* currency section ends */}
                    {/* covid section */}
                    <Paper style={{ padding: 10 }} className="todo-wrapper second-section-card">
                        <h4>COVID Tracker</h4>
                        <Divider />
                        {cLoading ? <>
                            <Skeleton variant="text" height={100} animation="pulse" />
                            <Skeleton variant="text" height={100} animation="wave" />
                        </> : <>
                            <p>Active : {covidData?.active}</p>
                            <p>Recovered : {covidData?.recovered}</p>
                            <p>Deaths : {covidData?.deaths}</p>
                            <p>Confirmed : {covidData?.confirmed}</p>
                        </>}
                    </Paper>
                    {/* covid section ends */}
                    {/* chat section */}
                    <Paper style={{ padding: 10 }} className="todo-wrapper second-section-card">
                        <h4>Chat</h4>
                        <Divider />
                        <Join />
                    </Paper>
                    {/* chat section ends */}
                </main>

            </div>

        </Container>
    )

}
export default Welcome;