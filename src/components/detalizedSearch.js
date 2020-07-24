import React from 'react';
import SearchParams from './searchParams'
import { GraphQLClient } from 'graphql-request'
import { Switch } from 'react-router-dom';
import Select from './select';
import Announcements_field from './announcements_field';
import SearchParams from './searchParams';

const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })


class DetalizedSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div>
                <Select/>
                <SearchParams/>
                <Announcements_field />
            </div>
        )
    }
}