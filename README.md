<h1 align="center">@codeshumon/popup-menu</h1>

<h1 align="center">React Popup Menu Component with Built-in CSS and Auto Positioning</h1>

<p align="center">
A lightweight, customizable React popup menu component with automatic positioning, smooth animations, and zero dependencies.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@codeshumon/popup-menu">
<img src="https://img.shields.io/npm/v/@codeshumon/popup-menu.svg" alt="npm version">
</a>
<a href="https://opensource.org/licenses/MIT">
<img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
</a>
</p>

<h2 align="center">React Popup Menu Tutorial Video</h2>
<h4 align="center">Watch how to use the popup-menu package in action</h4>

<p align="center">
  <a href="https://www.youtube.com/watch?v=VqWXTRMDz9g">
    <picture>
      <source srcset="https://img.youtube.com/vi/VqWXTRMDz9g/maxresdefault.jpg" media="(min-width: 640px)">
      <img src="https://img.youtube.com/vi/VqWXTRMDz9g/hqdefault.jpg" alt="Popup Menu Demo" 
           style="width:100%; max-width:560px; aspect-ratio:16/9; object-fit:cover;">
    </picture>
  </a>
</p>

<p align="center"><em>Click the image above to watch the video on YouTube</em></p>

<h2>Table of Contents</h2>
<ul>
<li><a href="#features-">Features ✨</a></li>
<li><a href="#installation-">Installation 📦</a></li>
<li><a href="#basic-usage-">Basic Usage 🔧</a></li>
<li><a href="#advanced-usage-">Advanced Usage 🛠️</a></li>
<li><a href="#api-reference-">API Reference 📚</a></li>
<li><a href="#position-options-">Position Options 🧭</a></li>
<li><a href="#typescript-support-">TypeScript Support ✅</a></li>
<li><a href="#browser-compatibility-">Browser Compatibility 🌐</a></li>
<li><a href="#contributing-">Contributing 🤝</a></li>
<li><a href="#license-">License 📄</a></li>
</ul>

<h2 id="features-">Features ✨</h2>
<ul>
<li>🎯 <strong>Automatic Positioning</strong>: Smart positioning that adjusts based on viewport space</li>
<li>🎨 <strong>Built-in CSS</strong>: No need to import separate CSS files</li>
<li>⚡ <strong>Smooth Animations</strong>: CSS transitions for opening/closing effects</li>
<li>📱 <strong>Responsive Design</strong>: Works on mobile and desktop devices</li>
<li>🎛️ <strong>Customizable</strong>: Extensive configuration options</li>
<li>🔧 <strong>TypeScript Support</strong>: Full type definitions included</li>
<li>📦 <strong>Zero Dependencies</strong>: Lightweight and fast</li>
</ul>

<h2 id="installation-">Installation 📦</h2>
<pre><code class="language-bash">npm install @codeshumon/popup-menu

or

yarn add @codeshumon/popup-menu
</code></pre>

<h2 id="basic-usage-">Basic Usage 🔧</h2>
<pre><code class="language-jsx">import React from 'react';
import { PopupMenu } from '@codeshumon/popup-menu';

function App() {
  return (
    &lt;PopupMenu
      trigger={&lt;button&gt;Open Menu&lt;/button&gt;}
    &gt;
      &lt;div onClick={() => console.log('Option 1')}&gt;Option 1&lt;/div&gt;
      &lt;div onClick={() => console.log('Option 2')}&gt;Option 2&lt;/div&gt;
      &lt;div onClick={() => console.log('Option 3')}&gt;Option 3&lt;/div&gt;
    &lt;/PopupMenu&gt;
  );
}

export default App;
</code></pre>

<h2 id="advanced-usage-">Advanced Usage 🛠️</h2>

<h3>With Header and Footer</h3>
<pre><code class="language-jsx">import React from 'react';
import { PopupMenu } from '@codeshumon/popup-menu';

function App() {
  return (
    &lt;PopupMenu
      trigger={&lt;button&gt;User Menu&lt;/button&gt;}
      header={&lt;div className="menu-header"&gt;User Options&lt;/div&gt;}
      footer={&lt;div className="menu-footer"&gt;Settings&lt;/div&gt;}
      position="bottom-right"
      animationDuration={300}
    &gt;
      &lt;div onClick={() => console.log('Profile')}&gt;Profile&lt;/div&gt;
      &lt;div onClick={() => console.log('Settings')}&gt;Settings&lt;/div&gt;
      &lt;div onClick={() => console.log('Logout')}&gt;Logout&lt;/div&gt;
    &lt;/PopupMenu&gt;
  );
}
</code></pre>

<h3>Custom Positioning</h3>
<pre><code class="language-jsx">import React from 'react';
import { PopupMenu } from '@codeshumon/popup-menu';

function App() {
  return (
    &lt;PopupMenu
      trigger={&lt;button&gt;Custom Position&lt;/button&gt;}
      position="top-center"
      viewportPadding={20}
      onOpenChange={(isOpen) => console.log('Menu is:', isOpen)}
      onClose={() => console.log('Menu closed')}
    &gt;
      &lt;div&gt;Item 1&lt;/div&gt;
      &lt;div&gt;Item 2&lt;/div&gt;
      &lt;div&gt;Item 3&lt;/div&gt;
    &lt;/PopupMenu&gt;
  );
}
</code></pre>

<h2 id="api-reference-">API Reference 📚</h2>

<h3>PopupMenu Props</h3>
<table>
    <thead>
        <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>trigger</code></td>
            <td>React.ReactNode</td>
            <td>Required</td>
            <td>The element that triggers the popup menu</td>
        </tr>
        <tr>
            <td><code>children</code></td>
            <td>React.ReactNode</td>
            <td>Required</td>
            <td>Menu items/content</td>
        </tr>
        <tr>
            <td><code>header</code></td>
            <td>React.ReactNode</td>
            <td>undefined</td>
            <td>Optional header content</td>
        </tr>
        <tr>
            <td><code>footer</code></td>
            <td>React.ReactNode</td>
            <td>undefined</td>
            <td>Optional footer content</td>
        </tr>
        <tr>
            <td><code>className</code></td>
            <td>string</td>
            <td>""</td>
            <td>Additional CSS class for the wrapper</td>
        </tr>
        <tr>
            <td><code>menuClassName</code></td>
            <td>string</td>
            <td>""</td>
            <td>Additional CSS class for the menu</td>
        </tr>
        <tr>
            <td><code>position</code></td>
            <td>PositionType</td>
            <td>"auto"</td>
            <td>Menu position relative to trigger</td>
        </tr>
        <tr>
            <td><code>onOpenChange</code></td>
            <td>(open: boolean) => void</td>
            <td>undefined</td>
            <td>Callback when menu opens/closes</td>
        </tr>
        <tr>
            <td><code>onClose</code></td>
            <td>() => void</td>
            <td>undefined</td>
            <td>Callback when menu closes</td>
        </tr>
        <tr>
            <td><code>animationDuration</code></td>
            <td>number</td>
            <td>200</td>
            <td>Animation duration in milliseconds</td>
        </tr>
        <tr>
            <td><code>viewportPadding</code></td>
            <td>number</td>
            <td>5</td>
            <td>Minimum padding from viewport edges in pixels</td>
        </tr>
    </tbody>
</table>

<h2 id="position-options-">Position Options 🧭</h2>

<p>The <code>position</code> prop accepts the following values:</p>
<table>
    <thead>
        <tr>
            <th>Position</th>
            <th>Description</th>
            <th>Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>"auto"</code></td>
            <td>Automatically chooses the best position</td>
            <td>Smart positioning based on available space</td>
        </tr>
        <tr>
            <td><code>"top-left"</code></td>
            <td>Above the trigger, aligned to left</td>
            <td>Menu appears above and left-aligned</td>
        </tr>
        <tr>
            <td><code>"top-center"</code></td>
            <td>Above the trigger, centered</td>
            <td>Menu appears above and centered</td>
        </tr>
        <tr>
            <td><code>"top-right"</code></td>
            <td>Above the trigger, aligned to right</td>
            <td>Menu appears above and right-aligned</td>
        </tr>
        <tr>
            <td><code>"bottom-left"</code></td>
            <td>Below the trigger, aligned to left</td>
            <td>Menu appears below and left-aligned</td>
        </tr>
        <tr>
            <td><code>"bottom-center"</code></td>
            <td>Below the trigger, centered</td>
            <td>Menu appears below and centered</td>
        </tr>
        <tr>
            <td><code>"bottom-right"</code></td>
            <td>Below the trigger, aligned to right</td>
            <td>Menu appears below and right-aligned</td>
        </tr>
        <tr>
            <td><code>"left-top"</code></td>
            <td>Left of the trigger, aligned to top</td>
            <td>Menu appears to the left and top-aligned</td>
        </tr>
        <tr>
            <td><code>"left-center"</code></td>
            <td>Left of the trigger, centered</td>
            <td>Menu appears to the left and centered</td>
        </tr>
        <tr>
            <td><code>"left-bottom"</code></td>
            <td>Left of the trigger, aligned to bottom</td>
            <td>Menu appears to the left and bottom-aligned</td>
        </tr>
        <tr>
            <td><code>"right-top"</code></td>
            <td>Right of the trigger, aligned to top</td>
            <td>Menu appears to the right and top-aligned</td>
        </tr>
        <tr>
            <td><code>"right-center"</code></td>
            <td>Right of the trigger, centered</td>
            <td>Menu appears to the right and centered</td>
        </tr>
        <tr>
            <td><code>"right-bottom"</code></td>
            <td>Right of the trigger, aligned to bottom</td>
            <td>Menu appears to the right and bottom-aligned</td>
        </tr>
    </tbody>
</table>

<h2 id="typescript-support-">TypeScript Support ✅</h2>

<p>This package includes full TypeScript type definitions:</p>
<pre><code class="language-typescript">import { PopupMenu, PopupMenuProps, PositionType } from '@codeshumon/popup-menu';

const menuProps: PopupMenuProps = {
  trigger: &lt;button&gt;Menu&lt;/button&gt;,
  children: &lt;div&gt;Menu Item&lt;/div&gt;,
  position: 'bottom-right' as PositionType,
  onOpenChange: (isOpen) => console.log(isOpen),
};

// Usage in component
function MyComponent() {
  return (
    &lt;PopupMenu {...menuProps} /&gt;
  );
}
</code></pre>

<h2 id="browser-compatibility-">Browser Compatibility 🌐</h2>

<p>This library is compatible with:</p>
<ul>
<li>✅ Chrome (latest)</li>
<li>✅ Firefox (latest)</li>
<li>✅ Safari (latest)</li>
<li>✅ Edge (latest)</li>
<li>✅ React 16.8+ (hooks compatible)</li>
<li>✅ TypeScript 3.8+</li>
</ul>

<h2 id="contributing-">Contributing 🤝</h2>

<p>Contributions are welcome! Please feel free to submit a Pull Request.</p>
<ol>
<li>Fork the repository</li>
<li>Create your feature branch (<code>git checkout -b feature/amazing-feature</code>)</li>
<li>Commit your changes (<code>git commit -m 'Add some amazing feature'</code>)</li>
<li>Push to the branch (<code>git push origin feature/amazing-feature</code>)</li>
<li>Open a Pull Request</li>
</ol>

<h2 id="license-">License 📄</h2>

<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

<p>MIT © <a href="https://www.npmjs.com/~codeshumon">codeshumon</a></p>