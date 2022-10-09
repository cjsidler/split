import styles from "./Unauthorized.module.scss";

function Unauthorized() {
	return (
		<div className={styles.unauthorized_container}>
			<h1>You are not authorized to view this resource</h1>
		</div>
	);
}

export default Unauthorized;
