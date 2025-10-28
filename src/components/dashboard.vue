<template>
  <nav>
    <div class="nav-logo">
      <h1>tickHandler Dashboard</h1>
    </div>
    <div class="nav-contents">
      <button @click="showTicketsSection" type="button">{{ showTickets ? "dashboard" : "tickets" }}</button>
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
          <p>{{ counts.open }}</p>
        </div>
        <div class="stat-card">
          <h2>In Progress Tickets</h2>
          <p>{{ counts.inProgress }}</p>
        </div>
        <div class="stat-card">
          <h2>Closed Tickets</h2>
          <p>{{ counts.closed }}</p>
        </div>
      </div>
    </div>

    <div v-if="showAddTaskScreen" class="addTicket">
      <header>
        <h1>Add New Ticket</h1>
      </header>
      <form @submit.prevent="newTicket">
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
        <p v-if="error" class="error-message" style="color: red;">{{ error }}</p>
        <button type="submit">Add Ticket</button>
      </form>
    </div>

    <div v-if="showTickets" class="ticket-manager">
      <header>
        <h1>Tickets</h1>
        <button @click="addTicketBtn" type="button">+ Add Ticket</button>
      </header>

      <div class="sortTickets">
        <button :class="{ active: activeFilter === 'all' }" @click="filterTickets('all')" type="button">all</button>
        <button :class="{ active: activeFilter === 'open' }" @click="filterTickets('open')" type="button">open</button>
        <button :class="{ active: activeFilter === 'in progress' }" @click="filterTickets('in progress')" type="button">in progress</button>
        <button :class="{ active: activeFilter === 'closed' }" @click="filterTickets('closed')" type="button">closed</button>
      </div>

      <div v-if="filteredTickets.length > 0" class="ticket-cards">
        <div
          v-for="(ticket, index) in filteredTickets"
          :key="index"
          :class="showFullDetails ? 'fullTicket-card' : 'ticket-card'"
        >
          <header>
            <h2>{{ ticket.name }}</h2>
            <p v-if="showFullDetails">{{ ticket.desc }}</p>
            <div class="dropdown">
              <button class="dropbtn" type="button">⋮</button>
              <div class="dropdown-content">
                <a @click.prevent> Edit </a>
                <a @click.prevent="deleteTicket(ticket)"> Delete </a>
                <a @click.prevent="fullDetails"> Show Details </a>
              </div>
            </div>
          </header>

          <div :class="statusClass(ticket.status)">
            <p>Status:</p>
            <span>{{ ticket.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import './dashboard.css'

const router = useRouter()

const showAddTaskScreen = ref(false)
const addTickets = ref([])
const taskName = ref('')
const taskDesc = ref('')
const showFullDetails = ref(false)
const showTickets = ref(false)
const showDashboard = ref(true)
const ticketStatus = ref('open')
const error = ref('')
const activeFilter = ref('all')

function satus(ticket) {
  // placeholder - left intentionally similar to original
}

function newTicket() {
  error.value = ''
  if (taskName.value.trim().length < 1) {
    error.value = 'Ticket title cannot be empty'
    return
  } else if (taskDesc.value.trim().length < 1) {
    error.value = 'Ticket description cannot be empty'
    return
  }

  const newT = {
    name: taskName.value,
    desc: taskDesc.value,
    status: ticketStatus.value || 'open'
  }

  addTickets.value.push(newT)
  taskName.value = ''
  taskDesc.value = ''
  error.value = ''
  showAddTaskScreen.value = false
}

function addTicketBtn() {
  showAddTaskScreen.value = !showAddTaskScreen.value
}

function fullDetails() {
  showFullDetails.value = !showFullDetails.value
}

function deleteTicket(ticketToDelete) {
  addTickets.value = addTickets.value.filter((t) => t !== ticketToDelete)
}

function showTicketsSection() {
  showTickets.value = !showTickets.value
  showDashboard.value = !showDashboard.value
}

function landingPage() {
  router.push('/')
}

function filterTickets(status) {
  activeFilter.value = status
}

const filteredTickets = computed(() => {
  if (activeFilter.value === 'all') return addTickets.value
  return addTickets.value.filter(t => t.status === activeFilter.value)
})

const counts = computed(() => ({
  open: addTickets.value.filter(t => t.status === 'open').length,
  inProgress: addTickets.value.filter(t => t.status === 'in progress').length,
  closed: addTickets.value.filter(t => t.status === 'closed').length
}))

function statusClass(status) {
  if (status === 'open') return 'status open'
  if (status === 'in progress') return 'status inprogress'
  return 'status closed'
}
</script>

<style scoped>
/* keep component scoped but import original CSS above; overrides or component-scoped tweaks can go here */
</style>