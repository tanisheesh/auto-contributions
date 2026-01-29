// Learning Objective:
// This tutorial will teach you how to create a custom, visually appealing,
// and interactive toast notification in Android using Kotlin.
// We will focus on using a custom layout and a Toast object to achieve this.

package com.example.customtoasttutorial

import android.content.Context
import android.graphics.Color
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity // Assumed for context example

// This is our custom Toast class.
// It inherits from the standard Android Toast class.
class CustomToast(
    context: Context, // The context is needed to inflate layouts and display the Toast.
    message: CharSequence, // The text message to display in the Toast.
    duration: Int // The duration for which the Toast should be shown (Toast.LENGTH_SHORT or Toast.LENGTH_LONG).
) : Toast(context) {

    // Initialize the Toast with the provided context.
    init {
        // Set the duration for the Toast.
        this.duration = duration

        // Inflate our custom layout for the Toast.
        // LayoutInflater.from(context) creates a LayoutInflater object.
        // .inflate() takes the layout resource ID and the root ViewGroup (null in this case, as the Toast handles its own positioning).
        val inflater = LayoutInflater.from(context)
        val layout: View = inflater.inflate(R.layout.custom_toast_layout, null) // R.layout.custom_toast_layout is our custom XML layout file.

        // Find the TextView in our custom layout and set the message.
        // The 'findViewById' method is used to get a reference to a UI element by its ID.
        val textView: TextView = layout.findViewById(R.id.toast_text)
        textView.text = message

        // Find the ImageView in our custom layout and set an icon.
        // We'll use a default success icon for this example.
        val imageView: ImageView = layout.findViewById(R.id.toast_icon)
        imageView.setImageResource(android.R.drawable.btn_star_big_on) // Example icon. Replace with your own drawable.

        // Set the custom layout for the Toast.
        this.view = layout

        // Set the gravity (position) of the Toast.
        // We want it to appear at the bottom center of the screen.
        this.setGravity(Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL, 0, 100) // 100 is the vertical offset from the bottom.
    }

    // This is a companion object, similar to static members in Java.
    // It's used to define functions that can be called without an instance of the class.
    companion object {
        // A convenient function to show our custom toast.
        // This function abstracts away the Toast creation and display logic.
        fun show(
            context: Context, // The context from which to show the Toast.
            message: CharSequence, // The message to display.
            duration: Int // The duration of the Toast.
        ) {
            // Create an instance of our CustomToast.
            val customToast = CustomToast(context, message, duration)

            // Show the Toast.
            customToast.show()
        }
    }
}

// Example Usage (This would typically be in an Activity or Fragment)

// Assume this code is inside an Activity class, e.g., MainActivity.kt

/*
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) // Your activity's layout

        // Example of showing the custom toast
        // You would trigger this from a button click, or some other event.
        // For demonstration, we'll show it directly in onCreate,
        // but in a real app, you'd want to use a user interaction.

        // To show the toast after the UI is ready, we can use a Handler.
        // This ensures the UI elements are properly initialized before showing the toast.
        Handler(Looper.getMainLooper()).postDelayed({
            CustomToast.show(
                this, // Pass the activity context
                "This is a custom success message!", // The message to display
                Toast.LENGTH_SHORT // Short duration
            )
        }, 1000) // Show after 1 second delay

        // You can also show a long toast:
        Handler(Looper.getMainLooper()).postDelayed({
            CustomToast.show(
                this,
                "This is a longer custom notification.",
                Toast.LENGTH_LONG
            )
        }, 3000) // Show after 3 seconds delay
    }
}
*/

// To make this code runnable, you'll need a layout file named 'custom_toast_layout.xml'
// in your 'res/layout' directory. Here's an example of what that file might look like:

/*
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/custom_toast_container"
    android:orientation="horizontal"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="@drawable/custom_toast_background" // A drawable for background
    android:padding="8dp"
    android:gravity="center_vertical">

    <ImageView
        android:id="@+id/toast_icon"
        android:layout_width="24dp"
        android:layout_height="24dp"
        android:layout_marginEnd="8dp"
        tools:src="@android:drawable/btn_star_big_on"/> // Example placeholder

    <TextView
        android:id="@+id/toast_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="@android:color/white"
        android:textSize="14sp"
        tools:text="Sample Toast Message"/>

</LinearLayout>
*/

// And a background drawable file named 'custom_toast_background.xml' in your 'res/drawable' directory:

/*
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="#333333"/> // Dark grey background
    <corners android:radius="12dp"/> // Rounded corners
</shape>
*/