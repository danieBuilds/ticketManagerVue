<template>
  <div>
    <nav>
      <div class="nav-logo">
        <h1>tickHandler Dashboard</h1>
      </div>
      <div class="nav-contents">
        <button @click="showTicketsSection" type="button">
          {{ showTickets ? "dashboard" : "tickets" }}
        </button>
        <button @click="landingPage" type="button">Logout</button>
      </div>
    </nav>

    <section id="dashboard-main">
      <div v-if="showDashboard" class="dashboard-container">
        <h1>Welcome to your Dashboard</h1>
        <p>Manage your tickets efficiently and stay organized.</p>

        <div class="stats">
          <div class="stat-card">
            <h2>Total Tickets</h2>
            <p>{{ addTickets.length }}</p>
          </div>
          <div class="stat-card">
            <h2>Open Tickets</h2>
            <p>{{ addTickets.filter(ticket => ticket.status === "open").length }}</p>
          </div>
          <div class="stat-card">
            <h2>In Progress Tickets</h2>
            <p>{{ addTickets.filter(ticket => ticket.status === "in progress").length }}</p>
          </div>
          <div class="stat-card">
            <h2>Closed Tickets</h2>
            <p>{{ addTickets.filter(ticket => ticket.status === "closed").length }}</p>
          </div>
        </div>
      </div>

      <div v-if="showAddTaskScreen" class="addTicket">
        <header>
          <h1>Add New Ticket</h1>
        </header>
        <form @submit="newTicket">
          <input
            type="text"
            name="ticketName"
            placeholder="Ticket Title"
            v-model="taskName"
          />
          <textarea
            name="ticketDesc"
            placeholder="Ticket Description"
            v-model="taskDesc"
          ></textarea>
          <div class="addTicket-status">
            <label>Status:</label>
            <select v-model="ticketStatus">
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <p v-if="error" class="error-message" style="color: red">{{ error }}</p>
          <button type="submit">Add Ticket</button>
        </form>
      </div>

      <div v-if="showTickets" class="ticket-manager">
        <header>
          <h1>Tickets</h1>
          <button @click="addTicketBtn" type="button">
            + Add Ticket
          </button>
        </header>

        <div class="sortTickets">
          <button 
            :class="{ active: activeFilter === 'all' }" 
            @click="filterTickets('all')"
          >
            all
          </button>
          <button 
            :class="{ active: activeFilter === 'open' }" 
            @click="filterTickets('open')"
          >
            open
          </button>
          <button 
            :class="{ active: activeFilter === 'in progress' }" 
            @click="filterTickets('in progress')"
          >
            in progress
          </button>
          <button 
            :class="{ active: activeFilter === 'closed' }" 
            @click="filterTickets('closed')"
          >
            closed
          </button>
        </div>

        <div v-if="addTickets.length > 0" class="ticket-cards">
          <div
            v-for="(ticket, index) in filteredTickets"
            :key="index"
            :class="showFullDetails ? 'fullTicket-card' : 'ticket-card'"
          >
            <header>
              <h2>{{ ticket.name }}</h2>
              <p v-if="showFullDetails">{{ ticket.desc }}</p>
              <div class="dropdown">
                <button class="dropbtn">⋮</button>
                <div class="dropdown-content">
                  <a>Edit</a>
                  <a @click="deleteTicket(ticket)">Delete</a>
                  <a @click="fullDetails">Show Details</a>
                </div>
              </div>
            </header>
            <div 
              :class="[
                'status',
                ticket.status === 'open' ? 'open' : 
                ticket.status === 'in progress' ? 'inprogress' : 
                'closed'
              ]"
            >
              <p>Status:</p>
              <span>{{ ticket.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import '../styles/dashboard.css';

const showAddTaskScreen = ref(false);
const addTickets = ref([]);
const taskName = ref('');
const taskDesc = ref('');
const showFullDetails = ref(false);
const showTickets = ref(false);
const showDashboard = ref(true);
const ticketStatus = ref('');
const error = ref('');
const activeFilter = ref('all');

const filteredTickets = computed(() => {
  return activeFilter.value === 'all' 
    ? addTickets.value 
    : addTickets.value.filter(ticket => ticket.status === activeFilter.value);
});

function newTicket(e) {
  e.preventDefault();

  if (taskName.value.trim().length < 1) {
    error.value = "Ticket title cannot be empty";
    return;
  } else if (taskDesc.value.trim().length < 1) {
    error.value = "Ticket description cannot be empty";
    return;
  }

  const ticket = {
    name: taskName.value,
    desc: taskDesc.value,
    status: ticketStatus.value || 'open'
  };

  addTickets.value.push(ticket);
  taskName.value = '';
  taskDesc.value = '';
  error.value = '';
  showAddTaskScreen.value = false;
}

function addTicketBtn() {
  showAddTaskScreen.value = !showAddTaskScreen.value;
}

function fullDetails() {
  showFullDetails.value = !showFullDetails.value;
}

function deleteTicket(ticketToDelete) {
  addTickets.value = addTickets.value.filter(t => t !== ticketToDelete);
}

function showTicketsSection() {
  showTickets.value = !showTickets.value;
  showDashboard.value = !showDashboard.value;
}

function landingPage() {
  window.location.href = "/";
}

function filterTickets(status) {
  activeFilter.value = status;
}
</script>