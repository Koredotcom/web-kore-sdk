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
|               | ![image](https://github.com/user-attachments/assets/a515857d-1bc2-44d2-8ecd-11864b33ee01) |
| Chat Window   | Yes   |
|               | ![image](https://github.com/user-attachments/assets/3bd84612-abec-4607-8975-188bdfad57da) |
| Welcome Screen        | Yes   |
|               | ![image](https://github.com/user-attachments/assets/4ace910f-acc5-4175-bd4a-704c73f98ee5) |
| Header        | Yes   |
|               | ![image](https://github.com/user-attachments/assets/2c32b7cf-e5a0-4f10-8329-c4742cb21a96) |
| Footer        | Yes   |
|               | ![image](https://github.com/user-attachments/assets/ecc79f3f-ecf9-4978-af26-47edda42ce72) |
| Templates     | Yes   |
|               | ![image](https://github.com/user-attachments/assets/9d69fc02-0f27-4ef4-989f-f7287ce06709) |


### Screen Reader Support

The Kore Web SDK v3 is designed to be fully compatible with screen readers.

https://github.com/user-attachments/assets/fe484d03-9086-4a3f-8b10-18bd3cfe9013

### Color contrast

The Kore Web SDK provides default light and dark themes that are fully WCAG 2.1 Level AA compliant with color contrast ratios of 4.5:1 or higher. For creating custom branding or specific accessibility needs, new themes can be created following the [Virtual Assistant Theme & Design guidelines](https://docs.kore.ai/xo/channels/add-web-mobile-client/?h=theme#virtual-assistant-theme-design).

When creating custom themes, ensure that:
*   All color combinations maintain the required contrast ratios
*   Interactive elements remain clearly distinguishable
*   Focus indicators are visible and meet contrast requirements
*   Custom themes are tested with assistive technologies before deployment


## Customization and Accessibility

The Kore Web SDK offers extensive customization options. While a base level of accessibility is provided, it is crucial to ensure that any customizations made also adhere to WCAG 2.1 Level AA standards. You can customize the SDK to best suit your specific accessibility requirements.

For detailed information on how to customize the SDK, please refer to our [Customization Documentation](../customizations/).

## Guidelines for Maintaining Compliance

To ensure ongoing WCAG 2.1 Level AA compliance with the SDK, developers should adhere to the following best practices when customizing or extending the SDK:

*   **Semantic HTML:** Utilize appropriate HTML5 elements to define the structure and meaning of content within custom templates and components.
*   **ARIA Attributes:** Implement ARIA (Accessible Rich Internet Applications) attributes where necessary to enhance the accessibility of dynamic content and custom controls. Refer to the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for guidance.
*   **Keyboard Navigation:** Ensure all interactive elements are focusable and operable via keyboard. Maintain a logical focus order.
*   **Color Contrast:** Verify that text and UI elements meet the minimum color contrast ratios specified by WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text and graphical objects). All default themes provided by the Kore Web SDK maintain a color contrast ratio of 4.5:1 or higher, ensuring compliance with WCAG 2.1 Level AA standards out of the box.
    [Image: Color Contrast Example]
*   **Text Alternatives:** Provide appropriate alternative text for all non-text content (e.g., icons, images).
*   **Responsive Design:** Ensure that the chat widget and its contents are responsive and accessible across various screen sizes and orientations.
*   **Testing:** Regularly test customizations with accessibility evaluation tools and assistive technologies (e.g., screen readers like NVDA, JAWS, or VoiceOver).

Customers can completely customize the SDK to make any necessary changes to meet their accessibility needs. It is the responsibility of the customer to ensure their customizations remain compliant with WCAG 2.1 Level AA standards.

This documentation aims to provide a clear understanding of the Kore AI Web SDK's accessibility features and empower developers to build inclusive chat experiences.
