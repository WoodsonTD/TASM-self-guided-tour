import ExhibitTitle from "../ExhibitTitle/ExhibitTitle";
import ModelView from "../AFrame/ModelView";
import ButtonPanel from "../ButtonPanel/ButtonPanel";

export default function ExhibitPage({ exhibitID}) {
        //This data will be fetched from the database
        // placeholder data for now!
const dataValue = getData(exhibitID);
const title = dataValue.title;

        return (
                <div className="ExhibitPage">
                <ExhibitTitle title={title} />
                <ModelView {... dataValue.mediaData} />
                <p>{dataValue.text}</p>
                <FurtherReading furtherReading={dataValue.furtherReading}/>
                <ButtonPanel />
                </div>
        );      
}

export function FurtherReading({furtherReading})
{
        return (
                <div className="FurtherReading">
                        <h2>Further Reading</h2>
                        <ul>
                                {furtherReading.map((item,index) => (
                                        <li key={index}><a target="blank" href={item.link}>{item.title}</a></li>
                                ))}
                        </ul>
                </div>
        );

}

// this is a placeholder function for fetching data from the database
function getData(exhibitID) {
        // fetch data from the database
        // return data
        return ({
                title:exhibitID,
                 mediaType:'Model',
                  mediaData:{geometry:'a-box'},
                   text:'CONTENT TEXT HERE',
                    furtherReading:[
                        {title:'Wiki',link:'https://en.wikipedia.org'},
                        {title:'dumby text',link:"https://www.google.com/"}
                        ]
                });
}