import { useEffect, useState } from 'react';

import { RepositoryItem } from './RepositoryItem';

import '../styles/Repository.scss';


interface Repository {
    name: string
    description: string
    html_url: string
}

export function RepositoryList(){
    const [Repositories, setRepositories] = useState<Repository[]>([]);


    useEffect(()=>{
        fetch('https://api.github.com/users/JamDev0/repos')
            .then(response => response.json())
            .then(data => {setRepositories(data)});
    }, []);
    

    return(
        <section className='Repository-Section'>
            <h1>Lista de repositórios</h1>

            <ul>
                {Repositories.map( Element => <RepositoryItem 
                                                Title={Element.name} 
                                                Description={Element.description} 
                                                Link={Element.html_url}
                                                key={Element.name}
                                               />)}
            </ul>
        </section>
    )
}