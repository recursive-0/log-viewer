## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/recursive-0/log-viewer.git
   cd log-viewer 
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).


## Thought process

Below functionalities are not implemented considering the current scope of the assignment

- Routing
- Store to truly manage global states
- Components such as toasts, dropdown menus, etc


### Custom Virtual Scrolling Implementation

Instead of using existing libraries, I built a virtualization hook from first principles to understand the core concepts:
The Problem: Rendering 10,000+ log entries creates massive DOM bloat, causing:

- Memory consumption scaling linearly with dataset size
- Layout thrashing during scroll events
- Janky scroll performance due to excessive re-renders

Think about massive million logs.

The Solution: Custom useVirtualList hook that:

- Renders only visible items (typically 6-8 rows vs entire dataset)
- Uses absolute positioning in virtual coordinate space
- Calculates visible range based on scroll position and container dimensions
- Eliminates O(n) DOM complexity, making it O(visible_items)