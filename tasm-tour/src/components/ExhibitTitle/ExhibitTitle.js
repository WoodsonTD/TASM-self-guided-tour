
export default function ExhibitTitle({title='Exhibit Title'}) {
        return (
                <div>
                        <h1 className="text-6xl text-red" style={{textAlign:'center'}}>{title}</h1>
                </div>
        );
}