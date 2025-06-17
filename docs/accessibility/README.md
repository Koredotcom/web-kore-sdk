# Kore AI Web SDK Accessibility

This document outlines the Kore AI Web SDK's commitment to accessibility and its compliance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

For more information on WCAG 2.1 Level AA, please visit the official [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/).

## Kore Web SDK Overview

The Kore Web SDK is a toolkit for launching chat widgets on websites or within other applications. This is an end-user facing application where the users interact with the virtual assistants. The SDK includes a reference implementation of the web chat widget, designed to meet AA standards of ADA compliance.

## Kore Web SDKs Accessibility

### WCAG 2.1 Level AA Compliance Status

| Name | Compliance Level |
|-------------|------------------|
| Kore Web SDK      | Full compliance  |

### Accessibility Support by Component

| Component     | Support |
|---------------|-------|
| Chat Icon     | Yes   |
|               | <!-- Placeholder for Chat Icon image --> [Image: Chat Icon Accessibility] |
| Chat Window   | Yes   |
|               | <!-- Placeholder for Chat Window image --> [Image: Chat Window Accessibility] |
| Header        | Yes   |
|               | <!-- Placeholder for Header image --> [Image: Header Accessibility] |
| Footer        | Yes   |
|               | <!-- Placeholder for Footer image --> [Image: Footer Accessibility] |
| Templates     | Yes   |
|               | <!-- Placeholder for Templates image --> [Image: Templates Accessibility] |

<!-- Placeholder for a screenshot illustrating overall component accessibility -->
[Image: SDK Component Accessibility Overview]

### Screen Reader Support

The Kore Web SDK v3 is designed to be fully compatible with screen readers.

<!-- Placeholder for a short video demonstrating screen reader functionality -->
[Video: Screen Reader Demonstration]

## Customization and Accessibility

The Kore Web SDK offers extensive customization options. While a base level of accessibility is provided, it is crucial to ensure that any customizations made also adhere to WCAG 2.1 Level AA standards. You can customize the SDK to best suit your specific accessibility requirements.

For detailed information on how to customize the SDK, please refer to our [Customization Documentation](../customizations/).

## Guidelines for Maintaining Compliance

To ensure ongoing WCAG 2.1 Level AA compliance with the SDK, developers should adhere to the following best practices when customizing or extending the SDK:

*   **Semantic HTML:** Utilize appropriate HTML5 elements to define the structure and meaning of content within custom templates and components.
*   **ARIA Attributes:** Implement ARIA (Accessible Rich Internet Applications) attributes where necessary to enhance the accessibility of dynamic content and custom controls. Refer to the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for guidance.
*   **Keyboard Navigation:** Ensure all interactive elements are focusable and operable via keyboard. Maintain a logical focus order.
    *   <!-- Placeholder for an image/gif demonstrating keyboard navigation -->
    [Image: Keyboard Navigation Example]
*   **Color Contrast:** Verify that text and UI elements meet the minimum color contrast ratios specified by WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text and graphical objects).
    *   <!-- Placeholder for an image showing good color contrast -->
    [Image: Color Contrast Example]
*   **Text Alternatives:** Provide appropriate alternative text for all non-text content (e.g., icons, images).
*   **Responsive Design:** Ensure that the chat widget and its contents are responsive and accessible across various screen sizes and orientations.
*   **Testing:** Regularly test customizations with accessibility evaluation tools and assistive technologies (e.g., screen readers like NVDA, JAWS, or VoiceOver).

Customers can completely customize the SDK to make any necessary changes to meet their accessibility needs. It is the responsibility of the customer to ensure their customizations remain compliant with WCAG 2.1 Level AA standards.

<!-- Placeholder for general accessibility best practices screenshot/diagram -->
[Image: General Accessibility Best Practices]

This documentation aims to provide a clear understanding of the Kore AI Web SDK's accessibility features and empower developers to build inclusive chat experiences.
