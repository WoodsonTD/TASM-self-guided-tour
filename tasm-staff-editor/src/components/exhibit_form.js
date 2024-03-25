import React from 'react'

class ExhibitForm extends React.Component {
    render() {
        return (
        <div>
            <h1>Exhibit Form</h1>
            <form>
                <label>
                    Title:
                    <input type="text" name="title" />
                </label>
                <label>
                    Media Type:
                    <input type="text" name="mediaType" />
                </label>
                <label>
                    Media Link:
                    <input type="text" name="mediaLink" />
                </label>
                <label>
                    Audio Link:
                    <input type="text" name="audioLink" />
                </label>
                <label>
                    QR Link:
                    <input type="text" name="qrLink" />
                </label>
                <label>
                    Content:
                    <input type="text" name="content" />
                </label>
                <textarea>Additional reading</textarea>
                <label>
                    Link:
                    <input type="text" name="articleLink" />
                </label>
                <label>
                    Link:
                    <input type="text" name="articleLink" />
                </label>
                <button type="submit" name='new'>New</button>
                <button type="submit" name='submit'>Submit</button>
            </form>
        </div>
        )
    }
    }

    export default ExhibitForm;
