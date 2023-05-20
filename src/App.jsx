import "./assets/header.css";
import "./assets/content.css"
import "./assets/article.css"
import { useState } from "react";
import { Formik, Field, Form } from "formik";
function App() {
  const [photos, setPhotos] = useState([]);
  const open = url => window.open(url)
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            //Llamar a la API de unsplash
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID joWuQ5MbRaat97-XoBfVVxhl9UEwKzJZNEBncJTwync",
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
            console.log(data);
          }}
        >
          <Form>
            <Field name="search"></Field>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => 
          <article key={photo.id} onClick={()=> open(photo.links.html)}>
            <img src={photo.urls.regular}/>
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>)}
        </div>
      </div>
    </div>
  );
}

export default App;
