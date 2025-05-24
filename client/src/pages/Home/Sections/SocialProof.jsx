import './SocialProof.css';

export default function SocialProof() {
  return (
    <div className="page-6">
      <section className="social-proof">
        <div className="social-proof-header">
          <h2>WORD ON THE STREET</h2>
        </div>
        <div className="social-comments">
          {[
            `"When it comes to epic birthday cakes..."`,
            `"No matter the occasion..."`,
            `"The chef of Rab di rasoi has created..."`,
          ].map((quote, index) => (
            <div key={index} className={`social-comment comment-${index + 1}`}>
              <p>{quote}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
