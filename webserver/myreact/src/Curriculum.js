import React, { Component } from 'react';
import axios from 'axios'; 

const URL = 'http://localhost:8888/api/';

class Curriculum extends Component {
    constructor(props){
        super(props)
          this.state = {
            curriculums: [], 
            id: 0, faculty: '',
            newId: 0, newFaculty: '',
        } 
    }

    componentDidMount() {
        this.getAllCurriculums() 
    }
    
    getAllCurriculums() {
        axios.get(`${URL}/curriculums`)
            .then(res => {
                    this.setState({curriculums: res.data})
                    console.log(res.data)
                }
            )
            .catch( (error) => { console.log(error); })
    }

    renderCurriculums() {
        return this.state.curriculums.map( (curriculum,index) => {
            if (curriculum !== null )
                return (                
                        <ul  key={curriculum.id}>

                            {curriculum.id}.&nbsp; {curriculum.faculty} &emsp;&emsp;
                          
                            <button onClick={() => this.deleteCurriculum(index)}>Delete</button> <br/><br/>
                        </ul>
                )
            return ('')
        })
    }

    deleteCurriculum(id) {       
        axios.delete(`${URL}/curriculum/${id}`)
            .then( (res) => {
                console.log('Delete:' + res)
                this.getAllCurriculums()  
            })
    }

    addCurriculum = (e) => {
            e.preventDefault() 
            axios.post(`${URL}/curriculums`,   {                
                faculty: this.state.faculty          
            })
                .then( (res) => {
                console.log('Create a new curriculum: ' + res);
                this.getAllCurriculums()  
            })
    }

    getCurriculum(id) {        
        axios.get(`${URL}/curriculum/${id}`)
            .then( (res) => {
                const {faculty} = res.data
                console.log( res.data)
                this.setState({ newId: id, newFaculty: faculty})
                console.log(this.state)
            })
    }


    handleChange = (e) =>  {
        const {name, value} = e.target 
        this.setState({[name]:value})
    }

    render() {
        return (
            <ul className="content-user">
            <br/><br/><br/><br/><br/><br/>
                <h1>College of Computing</h1>
                <ul>
                    {this.renderCurriculums()} 
                </ul><br/><br/><br/><br/>

                <h1>Add Curriculum</h1>
                <form onSubmit={this.addCurriculum}>
                <input type="text" name="faculty" size="50" 
                    value={this.state.faculty} 
                    onChange={this.handleChange} /> &nbsp;
                <button>Submit</button>
                </form>

                


            </ul>
        );
    }

}

export default Curriculum;