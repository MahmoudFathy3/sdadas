import Loading from "@components/Housing-system/Loading/Loading";
import { IconButton } from "@mui/material";
import { createLogin } from "@store/reducers/Auth/LoginSlice";
import styles from "@styles/Auth.module.css";
import { UserData } from "@utils/UserData";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const User = UserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.login);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    dispatch(createLogin(data))
      .unwrap()
      .then(() => {
        navigate("/", {
          replace: true,
        });
      });
  };

  if (User?.token) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className={styles.Auth}>
      <Helmet>
        <title>{`Dashboard Housing | Login`}</title>
      </Helmet>

      <div className={styles.Auth_content}>
        <div className={styles.Login}>
          <div className={styles.LoginDetails}>
            <div className={styles.desc}>
              <h3>مرحبا من جديد</h3>
              <p>
                يتناول هذا نظام إدارة العقارات الشامل المصمم لإدارة وتنسيق مختلف
                جوانب عمليات الأعمال العقارية بكفاءة، بما في ذلك الوحدات السكنية
                والفواتير والشكاوى والمستخدمين والمكونات الأخرى ذات الصلة.
              </p>
            </div>
          </div>
          <div className={styles.LoginForm}>
            <div className={styles.title}>
              <h3>تسجيل الدخول</h3>
            </div>
            <form method="POST" onSubmit={onSubmit}>
              <div className={styles.elementForm}>
                <label htmlFor="userName">الاسم</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="الاسم"
                  required
                />
              </div>
              <div className={styles.elementForm}>
                <label htmlFor="password">كلمة السر</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="كلمة السر"
                  required
                  className={styles.password}
                />
                <div className={styles.iconPassword}>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </IconButton>
                </div>
              </div>

              <p className="error">{error?.message}</p>

              <button className={styles.button} disabled={isLoading}>
                تسجيل الدخول {isLoading && <Loading />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
