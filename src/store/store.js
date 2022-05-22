import axios from 'axios'


axios.get('http://localhost:5000/api/student')
    .then(response => console.log(response))
