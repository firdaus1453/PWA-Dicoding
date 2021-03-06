var base_url = "https://readerapi.codepolitan.com/";
var api_token = '0687f71291614271b38aea977ae6c578'
var kode_liga = 2021 //id liga inggris
var base_url = "https://api.football-data.org/v2/";
var endpoint_tim = `${base_url}teams/`
var endpoint_pemain = `${base_url}players/`
var endpoint_klasemen = `${base_url}competitions/${kode_liga}/standings`
var endpoint_pertandingan_upcoming = `${base_url}competitions/${kode_liga}/matches?status=SCHEDULED`
var endpoint_pertandingan_detail = `${base_url}matches/`

var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getNameTeam() {
  if ('caches' in window) {
    caches.match(endpoint_klasemen).then(function (response) {
      if (response) {
        response.json().then(function (data) {
         var teamHTML = ''
      data.standings.forEach(function(klasemen) {
        var dataTabelKlasemen = "";
        klasemen.table.forEach(function(club){
        teamHTML += `
              <div class="card vertical">
                <a href="./detailteam.html?id=${club.team.id}">
                  <div class="center waves-effect waves-block waves-light center">
                    <img src="${club.team.crestUrl}" width="10%" height="10%"/>
                  </div>
                
                <div class="card-content">
                  <span class="card-title truncate center">${club.team.name}</span>
                </div>
                </a>
              </div>
            `;

        })
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("nameTeam").innerHTML = teamHTML;
        })
      }
    })
  }

  fetchApi(endpoint_klasemen)
    .then(status)
    .then(json)
    .then(function (data) {
        var teamHTML = ''
      data.standings.forEach(function(klasemen) {
        var dataTabelKlasemen = "";
        klasemen.table.forEach(function(club){
        teamHTML += `
              <div class="card vertical">
                <a href="./detailteam.html?id=${club.team.id}">
                  <div class="center waves-effect waves-block waves-light center">
                    <img src="${club.team.crestUrl}" width="10%" height="10%"/>
                  </div>
                
                <div class="card-content">
                  <span class="card-title truncate center">${club.team.name}</span>
                </div>
                </a>
              </div>
            `;

        })
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("nameTeam").innerHTML = teamHTML;
    })
    .catch(error);
}

// Blok kode untuk melakukan request data json
// function getArticles() {

//    if ('caches' in window) {
//     caches.match(base_url + "articles").then(function(response) {
//       if (response) {
//         response.json().then(function (data) {
//           var articlesHTML = "";
//           data.result.forEach(function(article) {
//             articlesHTML += `
//                   <div class="card">
//                     <a href="./article.html?id=${article.id}">
//                       <div class="card-image waves-effect waves-block waves-light">
//                         <img src="${article.thumbnail}" />
//                       </div>
//                     </a>
//                     <div class="card-content">
//                       <span class="card-title truncate">${article.title}</span>
//                       <p>${article.description}</p>
//                     </div>
//                   </div>
//                 `;
//           });
//           // Sisipkan komponen card ke dalam elemen dengan id #content
//           document.getElementById("articles").innerHTML = articlesHTML;
//         })
//       }
//     })
//   }

//   fetch(base_url + "articles")
//     .then(status)
//     .then(json)
//     .then(function(data) {
//       // Objek/array JavaScript dari response.json() masuk lewat data.
//       // Menyusun komponen card artikel secara dinamis
//       var articlesHTML = "";
//       data.result.forEach(function(article) {
//         articlesHTML += `
//               <div class="card">
//                 <a href="./article.html?id=${article.id}">
//                   <div class="card-image waves-effect waves-block waves-light">
//                     <img src="${article.thumbnail}" />
//                   </div>
//                 </a>
//                 <div class="card-content">
//                   <span class="card-title truncate">${article.title}</span>
//                   <p>${article.description}</p>
//                 </div>
//               </div>
//             `;
//       });
//       // Sisipkan komponen card ke dalam elemen dengan id #content
//       document.getElementById("articles").innerHTML = articlesHTML;
//     })
//     .catch(error);
// }

// // Untuk mengambil detail article
// function getArticleById() {
//   // Ambil nilai query parameter (?id=)
//   var urlParams = new URLSearchParams(window.location.search);
//   var idParam = urlParams.get("id");

//    if ('caches' in window) {
//     caches.match(base_url + "article/" + idParam).then(function(response) {
//       if (response) {
//         response.json().then(function (data) {
//           var articleHTML = `
//           <div class="card">
//             <div class="card-image waves-effect waves-block waves-light">
//               <img src="${data.result.cover}" />
//             </div>
//             <div class="card-content">
//               <span class="card-title">${data.result.post_title}</span>
//               ${snarkdown(data.result.post_content)}
//             </div>
//           </div>
//         `;
//       // Sisipkan komponen card ke dalam elemen dengan id #content
//       document.getElementById("body-content").innerHTML = articleHTML;
//         });
//       }
//     })
//   }


//   fetch(base_url + "article/" + idParam)
//     .then(status)
//     .then(json)
//     .then(function(data) {
//       // Objek JavaScript dari response.json() masuk lewat variabel data.
//       console.log(data);
//       // Menyusun komponen card artikel secara dinamis
//       var articleHTML = `
//           <div class="card">
//             <div class="card-image waves-effect waves-block waves-light">
//               <img src="${data.result.cover}" />
//             </div>
//             <div class="card-content">
//               <span class="card-title">${data.result.post_title}</span>
//               ${snarkdown(data.result.post_content)}
//             </div>
//           </div>
//         `;
//       // Sisipkan komponen card ke dalam elemen dengan id #content
//       document.getElementById("body-content").innerHTML = articleHTML;
//     });
// }