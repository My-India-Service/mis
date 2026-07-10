import Footer from '../components/Footer';
import HomeButton from '../components/HomeButton';
import './refund.css';
import './pageStyles.css';

const COMPANY_NAME = 'NB Corporate & Services';

const POLICY_ITEMS = [
  'Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.',
  `${COMPANY_NAME} does not accept cancellation requests for perishable items like flowers, eatables, etc. However, refund/replacement can be made if the customer establishes that the quality of the product delivered is not good.`,
  'In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within the same day of receipt of the products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within the same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.',
  `In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them. In case of any refunds approved by ${COMPANY_NAME}, it will take 6-8 days for the refund to be processed to the end customer.`,
];

function CancellationRefund() {
  return (
    <div className="refund-page">
      <HomeButton />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Cancellation and Refund Policy</h1>
            <hr style={{ borderColor: '#17A2B8' }} />
          </div>
          <div className="col-md-12 text-center mb-5">
            <h3>
              {COMPANY_NAME} believes in helping its customers as far as possible, and has therefore a liberal
              cancellation policy. Under this policy:
            </h3>
          </div>
          <div className="col-md-12">
            <ul>
              {POLICY_ITEMS.map((text) => (
                <li className="list" key={text.slice(0, 40)}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CancellationRefund;
