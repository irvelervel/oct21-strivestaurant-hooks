// this component will be loaded into <Home /> and will take care of fetching all the booked
// tables and create a dynamic list out of it

// for any component that needs to fetch some data and show it, you'll need a Class component

import { useState } from 'react'
// import {ListGroup} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { parseISO, format } from 'date-fns'
import { useEffect } from 'react'

// for showing an interface dynamically generated from a data fetching operation
// first and foremost you need to fetch the data and STORE IT into the state of the component
// then you can bind your interface to the state

// now our interface is successfully connected to our state; it will generate as many list items
// as elements in my reservations array.
// now our goal is just to MANAGE the reservations. How are you going to fill it up?
// it's a good practice to NOT perform a data-fetching operations BEFORE the full loading of the page
// because potentially the user can stare to a blank screen for quite some time (maybe you're in the 
// middle of the desert...)
// you want to present immediately the user with something to watch!
// after this initial loading, you're gonna fetch the data and update the interface

// CHAIN OF EVENTS:
// 1) FIRST RENDER OCCURRS (so prepare your interface for it, with a title, the map of the content, etc.)
// 2) COMPONENTDIDMOUNT HAPPENS (for fetching the reservations)
// 3) THE STATE IS BEING SET FROM COMPONENTDIDMOUNT
// 4) A NEW RENDER OCCURRS, BECAUSE YOU JUST SET A NEW STATE

const Reservations = () => {
    // state = {
    //     reservations: [], // <-- an empty array will ALWAYS be the initial state of any array
    //     isLoading: true, // <-- this is for showing/hiding the spinner
    //     isError: false // <-- this is for showing/hiding the error alert
    // }

    const [reservations, setReservations] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const fetchReservations = async () => {
        // whatever I put here, it will happen AFTER the initial invokation of render()
        // because this happens ALWAYS after the initial render, it's the PERFECT PLACE
        // for a network call!
        // ** COMPONENTDIDMOUNT HAPPENS JUST ONCE FOR EVERY LOADING OF THIS COMPONENT **
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/reservation')
            console.log('RESPONSE', response)
            if (response.ok) {
                let data = await response.json()
                console.log('DATA', data)
                // those are the reservations!
                // I need now to set them in my state...
                // this.setState({
                //     reservations: data,
                //     isLoading: false,
                //     isError: false
                // })
                setReservations(data)
                setIsLoading(false)
                setIsError(false)
                // 3)
                // now my state has been filled up!
            } else {
                console.log('something went wrong')
                // this is just a precaution in the case of something going bad with the fetch
                // we don't want the user to see an infinite spinner...
                // this.setState({
                //     isLoading: false,
                //     isError: true
                // })
                setIsLoading(false)
                setIsError(true)
            }
        } catch (error) {
            console.log(error)
            // this.setState({
            //     isLoading: false,
            //     isError: true
            // })
            setIsLoading(false)
            setIsError(true)
        }
    }

    // how can we wait for the initial render to complete before doing the fetch?
    // componentDidMount = async () => {
    //     // 2)
    //     this.fetchReservations()
    // }

    useEffect(() => {
        fetchReservations()
    }, [])

    // 1)
    // 4)
    // DO NOT DO THIS! calling setState in the render() method will trigger an infinite loop
    // "Maximum update depth exceeded"
    // because setting the state will launch render() again, and now you're stuck here :)
    // this.setState({
    //     reservations: []
    // })

    // render() fires every time the state is changed or the props change!
    // this is the secret behind react auto-re-rendering itself
    return (
        <>
            <h2>Booked Tables</h2>
            {/* CONDITIONAL RENDERING */}
            {
                // if isLoading is true, show the spinner
                // the && is called a SHORT-CIRCUIT
                isLoading && <Spinner animation="border" variant="primary" />
            }
            {
                isError && (
                    <Alert variant="danger">
                        Error fetching the reservations
                    </Alert>
                )
            }

            {/* THIS IS A CONDITIONAL RENDERING DONE WITH A TERNARY OPERATOR */}
            {/* FOR SHOWING SOMETHING OR SOMETHING ELSE IN ITS PLACE */}
            {/* {
                    this.state.reservations.length === 0 ? <div>empty</div> : <div>full</div>
                } */}

            {/* for transforming a string (which is a date from the DB) to another string */}
            {/* maybe with awereness of which day of the week it represents */}
            {/* we'll have to follow a 2-step-process: */}
            {/* 1) we'll need to convert the string from the DB to an actual Date */}
            {/* 2) once we have a Date object, we can convert it back to another string */}

            <ListGroup>
                {
                    reservations.map(r => (
                        <ListGroup.Item key={r._id}>{r.name} - we are in {r.numberOfPeople} at {' '}
                            {format(parseISO(r.dateTime), 'MMMM do yyyy | HH:mm')}
                            {/* {r.dateTime} */}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </>
    )
}

export default Reservations