import './CommunitySection.css';

export default function CommunitySection() {
  return (
    <div className="page-7">
      <div className="community">
        <div className="page-7-header">
          <h2>Our Community</h2>
          <p>Follow us to stay up to date on all things Rab di rasoi.</p>
        </div>
        <div className="instagram">
          <div>
            {/* <img className="ig-logo" src={} alt="" /> */}
          </div>
          <div className="ig-bio">
            <h4>
              <i>
                <a href="https://www.instagram.com/rabdirasoi/">
                  @rabdirasoi
                </a>
              </i>
            </h4>
            <p>
              😉Sugarcoating... <br />
              🍰Customized cake... <br />
              🧁100% Eggless <br />
            </p>
            <a
              className="ig-follow"
              href="https://www.instagram.com/rabdirasoi/"
            >
              Follow <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
