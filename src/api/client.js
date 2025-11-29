import axios from 'axios';

// Toggle this to switch between Mock and Live data
// In a real app, this would be an environment variable VITE_USE_MOCK
const USE_MOCK = true;

const api = axios.create({
    baseURL: 'http://localhost:8000', // FastAPI default
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Mock Data Generators ---

const INTENT_TYPES = ['Refund Request', 'Technical Issue', 'Sales Inquiry', 'Billing Question', 'Account Access'];
const AGENT_NAMES = ['Sarah Connor', 'John Wick', 'Ellen Ripley', 'James Bond', 'Tony Stark'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateMockIntents = (count = 5) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `intent-${Date.now()}-${i}`,
        text: `Customer query about ${getRandomElement(['pricing', 'login', 'error 404', 'subscription'])}...`,
        intent: getRandomElement(INTENT_TYPES),
        confidence: (Math.random() * 0.2 + 0.8).toFixed(2), // 0.80 - 1.00
        timestamp: new Date().toISOString(),
        status: Math.random() > 0.05 ? 'routed' : 'failed',
        agent: getRandomElement(AGENT_NAMES)
    }));
};

const generateMockStats = () => ({
    total_routed: 1245 + Math.floor(Math.random() * 10),
    success_rate: 98.5,
    active_agents: 12,
    avg_response_time: '1.2s'
});

const generateMockHeatmap = () => {
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    return hours.map(hour => ({
        time: hour,
        load: Math.floor(Math.random() * 50) + 20, // 20-70 chats
        capacity: 80
    }));
};

const generateMockRoutingHistory = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
        name: day,
        success: Math.floor(Math.random() * 20) + 80,
        failed: Math.floor(Math.random() * 5),
    }));
}

const generateMockChats = () => {
    return Array.from({ length: 20 }).map((_, i) => ({
        id: `chat-${2300 + i}`,
        customer: `Customer-${2300 + i}`,
        intent: getRandomElement(INTENT_TYPES),
        agent: getRandomElement(AGENT_NAMES),
        status: Math.random() > 0.1 ? 'Resolved' : 'Escalated',
        duration: `${Math.floor(Math.random() * 10) + 2}m`,
        time: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toLocaleTimeString()
    }));
}

// --- API Methods ---

export const getDashboardStats = async () => {
    if (USE_MOCK) return new Promise(r => setTimeout(() => r(generateMockStats()), 500));
    const res = await api.get('/stats/dashboard');
    return res.data;
};

export const getRealtimeIntents = async () => {
    if (USE_MOCK) return new Promise(r => setTimeout(() => r(generateMockIntents(1)), 200)); // Return 1 new intent
    const res = await api.get('/stats/intents/latest');
    return res.data;
};

export const getAgentLoadHeatmap = async () => {
    if (USE_MOCK) return new Promise(r => setTimeout(() => r(generateMockHeatmap()), 800));
    const res = await api.get('/stats/heatmap');
    return res.data;
};

export const getRoutingHistory = async () => {
    if (USE_MOCK) return new Promise(r => setTimeout(() => r(generateMockRoutingHistory()), 600));
    const res = await api.get('/stats/history');
    return res.data;
}

export const getRecentChats = async () => {
    if (USE_MOCK) return new Promise(r => setTimeout(() => r(generateMockChats()), 700));
    const res = await api.get('/chats/recent');
    return res.data;
}

export const getAgents = async () => {
    if (USE_MOCK) {
        return new Promise(r => setTimeout(() => r(AGENT_NAMES.map((name, i) => ({
            id: i,
            name,
            status: Math.random() > 0.2 ? 'Online' : 'Busy',
            specialty: getRandomElement(INTENT_TYPES),
            load: Math.floor(Math.random() * 100) + '%'
        }))), 500));
    }
    const res = await api.get('/agents');
    return res.data;
}

export default api;
