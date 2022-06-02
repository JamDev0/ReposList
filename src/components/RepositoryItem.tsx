interface RepositoryItemProps {
    Title: string
    Description?: string
    Link: string
}

export function RepositoryItem({ Title, Description, Link }: RepositoryItemProps){
    return(
        <li>
            <h2>{Title}</h2>

            <p>{Description ? Description : 'No description'}</p>

            <a href={Link}>Acessar repositorio</a>
        </li>
    )
}