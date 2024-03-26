
export default function Header({title='TASM Self-Guided Tour'}) {
 return (       
        <div className="Header" style={{background:'blue'}} >
                <h1 className="text-6xl text-red" style={{textAlign:'center'}}>{title}</h1>
        </div>
 );
}