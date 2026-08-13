const API_URL = "http://localhost:5000/api/tasks";


/**
 * Sends a request to the backend API
 * @param {string} url - API URL
 * @param {Object} options - Fetch request options
 * @returns {Promise<Object>} Data returned by the server
 */
const request = async (url, options = {}) => {

    // Send request to the backend
    const response = await fetch(url, options);

    // Convert response into JSON
    const json = await response.json();

    // Check if the server returned an error
    if (!json.success) {
        throw new Error(json.message);
    }

    // Return only the data from the response
    return json.data;
};


/**
 * Gets all tasks from the backend
 * @returns {Promise<Array>} List of tasks
 */
export const fetchTasks = () => {

    // Send GET request to the API
    return request(API_URL);
};


/**
 * Creates a new task
 * @param {Object} taskData - New task data
 * @returns {Promise<Object>} Created task
 */
export const createTask = (taskData) => {

    // Send POST request to create a task
    return request(API_URL, {

        // Tell the server that this is a POST request
        method: "POST",

        // Tell the server that we are sending JSON data
        headers: {
            "Content-Type": "application/json"
        },

        // Convert task object into JSON string
        body: JSON.stringify(taskData)
    });
};


/**
 * Updates an existing task
 * @param {number} taskId - ID of the task to update
 * @param {Object} updates - New task data
 * @returns {Promise<Object>} Updated task
 */
export const updateTask = (taskId, updates) => {

    // Send PUT request to update the task
    return request(`${API_URL}/${taskId}`, {

        // Use PUT method for updating
        method: "PUT",

        // Tell the server that we are sending JSON data
        headers: {
            "Content-Type": "application/json"
        },

        // Convert update data into JSON string
        body: JSON.stringify(updates)
    });
};


/**
 * Deletes a task
 * @param {number} taskId - ID of the task to delete
 * @returns {Promise<boolean>} True when task is deleted
 */
export const deleteTask = async (taskId) => {

    // Send DELETE request to the backend
    await request(`${API_URL}/${taskId}`, {

        // Use DELETE method
        method: "DELETE"
    });

    // Return true after successful deletion
    return true;
};