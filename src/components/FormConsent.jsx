import { publicPath } from "../seo.js";
import "./FormConsent.css";

const CONSENT_ERROR = "Подтвердите согласие на обработку данных, чтобы отправить заявку.";

export { CONSENT_ERROR };

export default function FormConsent({ checked, onChange }) {
  return (
    <div className="form-consent">
      <label className="form-consent__check">
        <input
          type="checkbox"
          name="consent"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>
          {"Даю "}
          <a href={publicPath("/consent")} target="_blank" rel="noopener noreferrer">
            согласие на обработку персональных данных
          </a>
          {" для рассмотрения заявки."}
        </span>
      </label>
      <a className="form-consent__policy" href={publicPath("/policy")} target="_blank" rel="noopener noreferrer">
        Как мы обрабатываем данные
      </a>
    </div>
  );
}
