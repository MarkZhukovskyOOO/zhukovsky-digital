import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <>
      <main className="notfound">
        <div className="container notfound__inner">
          <span className="notfound__code" aria-hidden="true">
            404
          </span>
          <h1 className="notfound__title">Такой страницы нет</h1>
          <p className="notfound__text">
            Возможно, страница переехала или в ссылке опечатка. Начните с
            главной или посмотрите, что мы уже сделали.
          </p>
          <div className="notfound__actions">
            <Link to="/" className="btn btn-primary">
              На главную
            </Link>
            <Link to="/cases" className="btn notfound__btn-secondary">
              Смотреть кейсы
            </Link>
          </div>
        </div>
      </main>
      <Footer slim />
    </>
  );
}
