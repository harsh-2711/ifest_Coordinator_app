<template>
  <div class="hello">
    <div class="loader" v-if="loading"></div>
    <div v-else>
      <h1>i.Fest 17 Coordinator Dashboard</h1>
      <h2>Event :
        <span>
      <select name="events" v-model="event">
        <option disabled value="">Please Select Event</option>
        <option>i.Biz</option>
        <option>i.Relay</option>
        <option>Blind-C</option>
        <option>i.App</option>
        <option>i.Database</option>
        <option>i.Maze</option>
        <option>i.Cube</option>
        <option>i.Decipher</option>
        <option>i.Ganith</option>
        <option>Treasure Hunt</option>
        <option>i.Electro</option>
        <option>i.Quiz</option>
        <option>i.Capture</option>
        <option>i.Database</option>
        <option>i.Bot</option>
        <option>i.Design</option>
        <option> i.Web</option>
        <option>i.Crypt</option>
        <option>i.Ride</option>
        <option>i.OHunt</option>
        </select>
      </span>
      </h2>
      <div v-if="event !=='' ">
        <h1>Participants {{ displayParticipants.length }}</h1>
      </div>
      <div v-if="displayParticipants.length != 0">
        <table>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>College</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          <tr v-for="(participants,index) in displayParticipants">
            <td>{{index + 1}}</td>
            <td>{{participants.Name}}</td>
            <td>{{participants.College}}</td>
            <td>{{participants.Email}}</td>
            <td>{{participants.Phone}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    beforeCreate() {
      var ref = firebase.database().ref().child('Participants');
      ref.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          this.allParticipants.push(childData);
        });
      }).then(() => {
          this.loading = false;
        }
      );
    },
    name: 'Home',
    data () {
      return {
        event: '',
        allParticipants: [],
        loading: true,
        displayParticipants: []
      }
    },
    watch: {
      event: function (val) {
        this.listParticipants(val);
      }
    },
    methods: {
      listParticipants: function (value) {
        this.displayParticipants = [],
        this.allParticipants.forEach((data) => {
          if (data.Events) {
            if(data.Events.Events) {
              console.log("Hello");
              if (data.Events.Events.includes(value)) {
                this.displayParticipants.push(data);
              }
            }
          }
        });

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .hello {
    width: 100%;
    height: 100%;
  }

  select {
    height: 30px;
    width: 180px;
    outline: none;
    font-size: 14px;
  }

  .loader {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  table, td, th {
    border: 1px solid #ddd;
    text-align: left;
  }

  table {
    margin: 0 auto 40px auto;
    border-collapse: collapse;
    width: 85%;
  }

  th, td {
    padding: 15px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
