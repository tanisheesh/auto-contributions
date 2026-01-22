# Fractal Generation with Recursion and Image Manipulation in Python
#
# Learning Objective:
# This tutorial will teach you how to generate intricate fractal patterns
# using the power of recursion and image manipulation with the Pillow library
# in Python. We'll focus on the classic Sierpinski Triangle as our example,
# illustrating how a simple rule applied repeatedly can lead to stunning complexity.
#
# Concepts Covered:
# 1. Recursion: Functions calling themselves to solve smaller versions of a problem.
# 2. Coordinate Geometry: Basic understanding of points and triangles.
# 3. Image Manipulation (Pillow): Creating, drawing on, and saving images.
# 4. Algorithmic Thinking: Breaking down a complex pattern into repeatable steps.

from PIL import Image, ImageDraw

def draw_sierpinski(draw, x1, y1, x2, y2, x3, y3, level):
    """
    Recursively draws the Sierpinski Triangle.

    Args:
        draw: A Pillow ImageDraw object to draw on.
        x1, y1: Coordinates of the first vertex of the current triangle.
        x2, y2: Coordinates of the second vertex of the current triangle.
        x3, y3: Coordinates of the third vertex of the current triangle.
        level: The current recursion level. Determines how many smaller triangles
               to draw. When level is 0, we've reached the smallest detail.
    """
    # Base Case: If the recursion level reaches 0, we stop drawing.
    # This prevents infinite recursion and defines the smallest triangle size.
    if level <= 0:
        # Draw the current triangle (a filled triangle)
        draw.polygon([(x1, y1), (x2, y2), (x3, y3)], fill="black")
        return

    # Recursive Step: Divide the current triangle into three smaller triangles
    # and call this function again for each of them.

    # Calculate the midpoints of each side of the current triangle.
    # These midpoints will form the vertices of the smaller triangles.
    mid12_x, mid12_y = (x1 + x2) // 2, (y1 + y2) // 2  # Midpoint of side 1-2
    mid23_x, mid23_y = (x2 + x3) // 2, (y2 + y3) // 2  # Midpoint of side 2-3
    mid31_x, mid31_y = (x3 + x1) // 2, (y3 + y1) // 2  # Midpoint of side 3-1

    # Recursively draw the three smaller Sierpinski triangles.
    # We reduce the 'level' by 1 for each recursive call, bringing us closer
    # to the base case.

    # Top-left triangle
    draw_sierpinski(draw, x1, y1, mid12_x, mid12_y, mid31_x, mid31_y, level - 1)
    # Top-right triangle
    draw_sierpinski(draw, mid12_x, mid12_y, x2, y2, mid23_x, mid23_y, level - 1)
    # Bottom triangle
    draw_sierpinski(draw, mid31_x, mid31_y, mid23_x, mid23_y, x3, y3, level - 1)

# --- Example Usage ---

if __name__ == "__main__":
    # Define image dimensions
    image_width = 800
    image_height = 700
    # Define the initial recursion level. Higher levels create more detail.
    # Be mindful that very high levels can take a long time to compute.
    recursion_level = 7

    # Create a new blank image with a white background
    # 'RGB' mode means Red, Green, Blue color channels.
    # (255, 255, 255) is the RGB tuple for white.
    img = Image.new('RGB', (image_width, image_height), color = (255, 255, 255))
    # Get a drawing object to add shapes to the image
    draw = ImageDraw.Draw(img)

    # Define the vertices of the outermost triangle.
    # This is the "seed" triangle from which the fractal grows.
    # The coordinates are (x, y), with (0,0) being the top-left corner.
    outer_triangle_vertices = [
        (image_width // 2, 50),              # Top vertex (centered horizontally)
        (50, image_height - 50),             # Bottom-left vertex
        (image_width - 50, image_height - 50) # Bottom-right vertex
    ]

    # Unpack the vertex coordinates for the draw_sierpinski function
    x1, y1 = outer_triangle_vertices[0]
    x2, y2 = outer_triangle_vertices[1]
    x3, y3 = outer_triangle_vertices[2]

    # Call the recursive function to start drawing the Sierpinski Triangle
    # We pass the drawing object, the initial triangle vertices, and the desired recursion level.
    draw_sierpinski(draw, x1, y1, x2, y2, x3, y3, recursion_level)

    # Save the generated fractal image
    # The format is automatically determined by the file extension.
    img.save("sierpinski_triangle.png")
    print(f"Sierpinski Triangle generated with recursion level {recursion_level}.")
    print("Image saved as sierpinski_triangle.png")

    # To view the image, you might need to open the file manually
    # or use img.show() which can depend on your system's image viewer.
    # img.show()