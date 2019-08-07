Vue.component('partido', {
  props: ['nombre', 'mes', 'dia', 'horario', 'lugar', 'url'],
  template: `
    <table>
    <tbody>
    <tr>
    <td><span>{{dia + '/' + mes}}</span></td>
    <td><span>{{horario}}</span></td>
    <td><span>{{nombre}}</span></td>
    <td><span>  <a id="llevarme a maps" v-bind:href="url">{{ lugar }}</a>
                <a id="mostrar mapa" v-on:click="seleccionarEstadio(url)"></a>
        </span>
    </td>
    </tr>
    </tbody>
    </table>
    `,
})

var app = new Vue({
  el: '#app',
  data: {
    page: "Sch",
    partidos: [],
    meses: [{
        nombre: "June",
        numero: 6
      },
      {
        nombre: "July",
        numero: 7
      },
      {
        nombre: "August",
        numero: 8
      },
    ],
    forumPosts: [],
    logged : false
  },
  methods: {
    cambiarMes(numeroDeMes) {
      this.partidos = partidos.filter(x => x.mes == numeroDeMes);
      var url = this.partidos[0].url;
      this.seleccionarEstadio(url, 0);
    },
    seleccionarEstadio(url, index) {
      $("#map-seleccionado").attr("src", url);
      $(".btn-estadio-class").removeClass("unaClase");
      $("#btn-estadio" + index).addClass("unaClase");
    },
    funcCom: function(postKey){
      var commInput = document.getElementById("comm-input-"+postKey).value
      
      var aux = commInput.replace(/ /g,"")
      
      if(aux==""){
        return alert("The comment must have some text on it!");
      }else{
        var username = firebase.auth().currentUser.displayName;
        var uid = firebase.auth().currentUser.uid;

        createNewComment(postKey, username, uid, commInput);
        document.getElementById("comm-input-"+postKey).value = '';
      }
      
    },
    mostrarChat: function(id){

    }
  }
})

function switchPage(newPage){
  app.page = newPage;
}

var today = new Date();
var mesActual = today.getMonth() + 1;

app.cambiarMes(mesActual)


$(".fixed-action-btn").click(function () {
 
  var data = "<p>   Please email us at: <a href='mailto:nysl@chisoccer.org'>nysl@chisoccer.org</a></p>  We will reply to your email as soon as we can."
  Swal.fire({
    title: " <i class='small material-icons'>drafts</i> Contact ",
    html: data

  })

});

var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('sign-out-button');

// function onAuthStateChanged(user) {
//     // We ignore token refresh events.
//     if (user && currentUID === user.uid) {
//       return;
//     }
window.addEventListener('load', function () {
  // Bind Sign in button.
  signInButton.addEventListener('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  // Bind Sign out button.
  signOutButton.addEventListener('click', function () {
    firebase.auth().signOut();
  });

  // Listen for auth state changes
  // firebase.auth().onAuthStateChanged(onAuthStateChanged);
}, false)


