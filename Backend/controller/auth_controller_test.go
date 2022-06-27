package controller

// import (
// 	"encoding/json"
// 	"net/http"
// 	"time"
// 	"github.com/golang-jwt/jwt/v4"
// )

// type User struct {
// 	Username string `json:"username"`
// 	Password string `json:"password"`
// }

// type LoginSuccessResponse struct {
// 	Username string `json:"username"`
// 	Token    string `json:"token"`
// }

// type AuthErrorResponse struct {
// 	Error string `json:"error"`
// }

// var jwtKey = []byte("key")

// type Claims struct {
// 	Username string
// 	Role     string
// 	jwt.StandardClaims
// }

// func (api *API) login(w http.ResponseWriter, req *http.Request) {
// 	api.AllowOrigin(w, req)
// 	var user User
// 	err := json.NewDecoder(req.Body).Decode(&user)
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	res, err := api.usersRepo.Login(user.Username, user.Password)

// 	w.Header().Set("Content-Type", "application/json")
// 	encoder := json.NewEncoder(w)
// 	if err != nil {
// 		w.WriteHeader(http.StatusUnauthorized)
// 		encoder.Encode(AuthErrorResponse{Error: err.Error()})
// 		return
// 	}

// 	userRole, err := api.usersRepo.GetUserRole(*res)

// 	expirationTime := time.Now().Add(60 * time.Minute)

// 	claims := &Claims{
// 		Username: user.Username,
// 		Role:     *userRole,
// 		StandardClaims: jwt.StandardClaims{
// 			ExpiresAt: expirationTime.Unix(),
// 		},
// 	}

// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

// 	tokenString, err := token.SignedString(jwtKey)
// 	if err != nil {
// 		w.WriteHeader(http.StatusInternalServerError)
// 		return
// 	}

// 	http.SetCookie(w, &http.Cookie{
// 		Name:    "token",
// 		Value:   tokenString,
// 		Expires: expirationTime,
// 	})

// 	encoder.Encode(LoginSuccessResponse{Username: *res, Token: tokenString})
// }

// func (api *API) logout(w http.ResponseWriter, req *http.Request) {
// 	api.AllowOrigin(w, req)

// 	token, err := req.Cookie("token")
// 	if err != nil {
// 		if err == http.ErrNoCookie {
// 			w.WriteHeader(http.StatusUnauthorized)
// 			return
// 		}
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}
// 	if token.Value == "" {
// 		w.WriteHeader(http.StatusUnauthorized)
// 		return
// 	}

// 	c := http.Cookie{
// 		Name:   "token",
// 		MaxAge: -1,
// 	}
// 	http.SetCookie(w, &c)

// 	w.WriteHeader(http.StatusOK)
// 	w.Write([]byte("logout success"))
