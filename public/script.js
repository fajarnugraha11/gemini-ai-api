document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');

  // Conversation history payload format: [{ role: 'user' | 'model', text: string }]
  const conversation = [];

  /**
   * Helper function to append message element to chat box
   */
  function appendMessage(role, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${role}-message`);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
  }

  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = userInput.value.trim();
    if (!text) return;

    // Clear input field
    userInput.value = '';

    // 1. Add user message to UI and conversation history
    appendMessage('user', text);
    conversation.push({ role: 'user', text });

    // 2. Show temporary "Thinking..." bot message
    const thinkingMessageElement = appendMessage('model', 'Thinking...');

    // Disable input controls during API request
    userInput.disabled = true;
    const submitBtn = chatForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      // 3. Send POST request to backend /api/chat
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conversation })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      // 4. Replace "Thinking..." with AI reply or fallback message
      if (data && data.result) {
        const aiResponse = data.result;
        thinkingMessageElement.textContent = aiResponse;
        // Save model response to history for subsequent context
        conversation.push({ role: 'model', text: aiResponse });
      } else {
        thinkingMessageElement.textContent = 'Sorry, no response received.';
        // Remove unhandled user turn on missing response
        conversation.pop();
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      // 5. Show error message on network/server failures
      thinkingMessageElement.textContent = 'Failed to get response from server.';
      // Remove unhandled user turn on error
      conversation.pop();
    } finally {
      // Re-enable controls and refocus input
      userInput.disabled = false;
      if (submitBtn) submitBtn.disabled = false;
      chatBox.scrollTop = chatBox.scrollHeight;
      userInput.focus();
    }
  });
});
