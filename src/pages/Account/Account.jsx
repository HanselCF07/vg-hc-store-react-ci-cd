import useAPI from "../../hooks/useAPI";
import styles from "./Account.module.css";

export default function Account() {
  //const { data: purchases, loading, error } = useAPI("/api/v1/vg-hc-store/user/purchases");
  const { data: purchases, loading, error } = useAPI("");

  return (
    <div className={styles.accountPage}>
      <h2>Gestión de Cuenta</h2>

      <section>
        <h3>Cuenta</h3>
        <ul>
          <li>Ajustes</li>
          <li>Contraseña y Seguridad</li>
        </ul>
      </section>

      <section>
        <h3>Pagos</h3>
        <ul>
          <li>Configuración de Pagos</li>
          <li>Saldo</li>
          <li>Canjear Código</li>
          <li>Regalos</li>
        </ul>
      </section>

      <section>
        <h3>Compras</h3>
        <ul>
          <li>Historial</li>
        </ul>
      </section>
    </div>
  );
}