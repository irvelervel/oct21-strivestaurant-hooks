// this component will generate a form we're going to use for reserving a table!
// once filled up, we're going to send all the info to the striveschool apis

// because we need to collect the info from the form, we're going to need a state
// therefore, ReservationForm will be a class based component
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// these are MORE SPECIFIC imports! these will weight less once you bundle your app

// which properties I need to send?
// name
// phone
// numberOfPeople
// smoking <-- true/false
// dateTime
// specialRequests

const ReservationForm = () => {
    // every component needs to output some JSX...
    // in a class component you're going to return the JSX from the render() method
    // so render() must be defined in every class component

    // state = {
    //     reservation: {
    //         name: '',
    //         phone: '',
    //         numberOfPeople: 1,
    //         smoking: false,
    //         dateTime: '',
    //         specialRequests: '',
    //     }
    // }

    const [reservation, setReservation] = useState({
        name: '',
        phone: '',
        numberOfPeople: 1,
        smoking: false,
        dateTime: '',
        specialRequests: '',
    })

    const handleInput = (property, value) => {
        // this.setState({
        //     reservation: {
        //         ...this.state.reservation,
        //         [property]: value
        //         // property: value <-- writing property in this way will just set a key in the
        //         // reservation object called 'property'!!
        //         // if you want to READ the value of your parameter, which will be "name", "phone",
        //         // "numberOfPeople" etc. you need to EVALUATE your property argument
        //         // you can do it creating a key called [property] with square brackets
        //     }
        // })

        setReservation({
            ...reservation,
            [property]: value
        })
    }

    const handleSubmit = async (e) => {
        // we need to overwrite the default form submission behavior,
        // which is refreshing the page
        // e -> is the form submission event
        e.preventDefault()
        // a try/catch block is a good habit for any kind of operation that
        // can fail out of your control
        try {
            // this is the chained .then() method for dealing with promises
            // fetch("https://striveschool-api.herokuapp.com/api/reservation", {
            //     method: 'POST',
            //     body: JSON.stringify(this.state.reservation),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // })
            //     .then((response) => {
            //         console.log(response)
            //         if (response.ok) {
            //             alert('Reservation was saved!')
            //             this.setState({
            //                 reservation: {
            //                     name: '',
            //                     phone: '',
            //                     numberOfPeople: 1,
            //                     smoking: false,
            //                     dateTime: '',
            //                     specialRequests: '',
            //                 }
            //             })
            //         } else {
            //             alert('There was a problem with your reservation')
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })

            // this instead is the async/await method, choose your favorite!
            let response = await fetch("https://striveschool-api.herokuapp.com/api/reservation", {
                method: 'POST',
                body: JSON.stringify(reservation),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(response)
            if (response.ok) {
                alert('Reservation was saved!')
                // this.setState({
                //     reservation: {
                //         name: '',
                //         phone: '',
                //         numberOfPeople: 1,
                //         smoking: false,
                //         dateTime: '',
                //         specialRequests: '',
                //     }
                // })
                setReservation({
                    name: '',
                    phone: '',
                    numberOfPeople: 1,
                    smoking: false,
                    dateTime: '',
                    specialRequests: '',
                })
            } else {
                alert('There was a problem with your reservation')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        // the <> tag is called a React Fragment, it's just a "virtual" wrapper
        <div className="my-3">
            <h2>Book your table here!</h2>
            {/* <form /> */}
            <Form onSubmit={handleSubmit}>
                {/* ...but if you need to pass other custom args to handleSubmit... */}
                {/* <Form onSubmit={e => this.handleSubmit(e, 'stefano')}> */}
                <Form.Group>
                    <Form.Label>Your name</Form.Label>
                    {/* Form.Control -> <input /> */}
                    <Form.Control
                        type="text"
                        placeholder="Insert your name here"
                        required
                        value={reservation.name}
                        onChange={(e) => {
                            // this is the long way, it works, but it's not impressive...
                            // this.setState({
                            //     reservation: {
                            //         ...this.state.reservation,
                            //         name: e.target.value,
                            //         // e.target.value is the text I'm inputting
                            //     }
                            // })
                            handleInput('name', e.target.value)
                        }}
                    // in every controlled input field you want to have 2 additional props:
                    // value -> which is going to be bound to a string in the state
                    // onChange -> which is going to change that property in the state
                    // -> TWO WAY DATA BINDING
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Your phone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Insert your phone here"
                        value={reservation.phone}
                        required
                        onChange={(e) => {
                            // this.setState({
                            //     reservation: {
                            //         ...this.state.reservation,
                            //         phone: e.target.value
                            //         // here I want to retain all the other values as well!
                            //     }
                            // })
                            handleInput('phone', e.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>How many people?</Form.Label>
                    <Form.Control
                        as="select"
                        value={reservation.numberOfPeople}
                        required
                        onChange={e => {
                            // this.setState({
                            //     reservation: {
                            //         ...this.state.reservation,
                            //         numberOfPeople: e.target.value
                            //     }
                            // })
                            handleInput('numberOfPeople', e.target.value)
                        }}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Do you smoke?"
                        // the value of a checkbox "on" || "off"
                        checked={reservation.smoking}
                        // checked can be instead true || false
                        onChange={e => {
                            handleInput('smoking', e.target.checked)
                        }}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date & Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={reservation.dateTime}
                        required
                        onChange={e => {
                            handleInput('dateTime', e.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Any special request?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        required
                        value={reservation.specialRequests}
                        onChange={e => {
                            handleInput('specialRequests', e.target.value)
                        }}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ReservationForm