import RentalForm from 'components/forms/RentalForm';
import { createRental } from 'actions';
import createImage from 'images/create-rental.jpg';

function RentalNewPage({ history }) {
  async function handleCreateRental(formData) {
    try {
      await createRental(formData);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section id="newRental">
      <div className="bi-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Create Rental</h1>
            <RentalForm handleCreateRental={handleCreateRental} />
            {/* <div>
              <p>
                Some Errors
              </p>
            </div> */}
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">
                Hundreds of awesome places in reach of few clicks.
              </h2>
              <img src={createImage} alt="Create new rental" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalNewPage;
