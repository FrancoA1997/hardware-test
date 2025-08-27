/* ------------------------------Imports---------------------------- */
//Styles
//Components
//Icons
//Props
//React
//Images
import image from "../../assets/about-image.jpg";
import image2 from "../../assets/about-image2.jpg";
import image3 from "../../assets/about-image3.png";
import image4 from "../../assets/about-image4.png";
import Image from "next/image";
/*---------------------------------------------------------------------- */

const About = () => {
  return (
    <section className="content">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="content__item-row"
          >
            <div className="image-container">
              <Image src={image} alt="about__image1" />
            </div>
            <div className="text">
              <h2>Nuestros comienzos</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur maxime eum eaque error, nobis molestiae dignissimos
                repellendus exercitationem excepturi, modi inventore, quasi
                quas. Dolorem corrupti aliquam officiis obcaecati eligendi ad
                veritatis officia eum cum temporibus cupiditate, blanditiis
                libero, suscipit numquam quidem? Unde velit cupiditate ullam.
                <br />
                <br /> Voluptatibus, aliquid labore temporibus vero beatae et id
                vitae facilis accusantium cum deserunt ut, nemo libero,
                veritatis delectus est. Mollitia repudiandae saepe assumenda
                similique. Minus praesentium voluptatibus, facere natus quam
                sunt perspiciatis fuga non, omnis assumenda veniam eveniet,
                dignissimos commodi maxime consequuntur accusantium.
              </p>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="content__item-row reverse"
          >
            <div className="image-container">
              <Image src={image2} alt="about__image1" />
            </div>
            <div className="text">
              <h2>Expandiendo nuestro enfoque</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur maxime eum eaque error, nobis molestiae dignissimos
                repellendus exercitationem excepturi, modi inventore, quasi
                quas. Dolorem corrupti aliquam officiis obcaecati eligendi ad
                veritatis officia eum cum temporibus cupiditate, blanditiis
                libero, suscipit numquam quidem? <br />
                <br /> Unde velit cupiditate ullam.
                Voluptatibus, aliquid labore temporibus vero beatae et id vitae
                facilis accusantium cum deserunt ut, nemo libero, veritatis
                delectus est. 
              </p>
            </div>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'  className="content__item-column">
            <h2>Siempre en constante evolucion</h2>
            <div className="image-container">
              <Image src={image3} alt="about__image1" />
            </div>
            <div className="text">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur maxime eum eaque error, nobis molestiae dignissimos
                repellendus exercitationem excepturi, modi inventore, quasi
                quas. Dolorem corrupti aliquam officiis obcaecati eligendi ad
                veritatis officia eum cum temporibus cupiditate, blanditiis
                libero, suscipit numquam quidem? Unde velit cupiditate ullam.
                Voluptatibus, aliquid labore temporibus vero beatae et id vitae
                facilis accusantium cum deserunt ut, nemo libero, veritatis
                delectus est. Mollitia repudiandae saepe assumenda similique.
                Minus praesentium voluptatibus, facere natus quam sunt
                perspiciatis fuga non, omnis assumenda veniam eveniet.
              </p>
            </div>
          </div>
          <div data-aos='fade-up' data-aos-duration='1000'  className="content__item-row">
            <div className="image-container">
              <Image src={image4} alt="about__image1" />
            </div>
            <div className="text">
              <h2>Nos digitalizamos</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur maxime eum eaque error, nobis molestiae dignissimos
                repellendus exercitationem excepturi, modi inventore, quasi
                quas. Dolorem corrupti aliquam officiis obcaecati eligendi ad
                veritatis officia eum cum temporibus cupiditate, blanditiis
                libero, suscipit numquam quidem? Unde velit cupiditate ullam.
                <br />
                <br /> Voluptatibus, aliquid labore temporibus vero beatae et id
                vitae facilis accusantium cum deserunt ut, nemo libero,
                veritatis delectus est. Mollitia repudiandae saepe assumenda
                similique.{" "}
              </p>
            </div>
          </div>
        </section>
  )
}

export default About