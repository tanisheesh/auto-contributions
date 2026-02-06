-- SQL Tutorial: Uncovering Hidden Patterns in Historical Data to Predict Future Trends
-- Learning Objective: This tutorial will teach you how to use SQL to identify recurring patterns in historical data,
-- a fundamental step in predicting future trends. We will focus on identifying seasonal trends in sales data.

-- Assumption: You have a database with a table named 'sales_data' that contains historical sales information.
-- The 'sales_data' table is assumed to have at least the following columns:
-- - sale_id (INT, PRIMARY KEY): Unique identifier for each sale.
-- - sale_date (DATE): The date the sale occurred.
-- - amount (DECIMAL): The monetary value of the sale.

-- Let's start by creating a dummy 'sales_data' table and populating it with some sample data for demonstration.
-- In a real-world scenario, you would connect to your existing database.

-- Drop the table if it already exists, to ensure a clean setup for the tutorial.
DROP TABLE IF EXISTS sales_data;

-- Create the 'sales_data' table.
CREATE TABLE sales_data (
    sale_id INT PRIMARY KEY,
    sale_date DATE,
    amount DECIMAL(10, 2)
);

-- Insert sample data into the 'sales_data' table.
-- We are simulating sales over a few years, with some noticeable monthly patterns.
INSERT INTO sales_data (sale_id, sale_date, amount) VALUES
(1, '2022-01-05', 150.00),
(2, '2022-01-10', 200.50),
(3, '2022-02-15', 180.75),
(4, '2022-02-20', 220.00),
(5, '2022-03-10', 250.00),
(6, '2022-03-20', 300.50),
(7, '2022-04-01', 280.00),
(8, '2022-04-15', 320.75),
(9, '2022-05-05', 350.00),
(10, '2022-05-15', 400.50),
(11, '2022-06-10', 420.00),
(12, '2022-06-20', 450.75),
(13, '2022-07-01', 480.00),
(14, '2022-07-15', 500.50),
(15, '2022-08-05', 520.00),
(16, '2022-08-15', 550.75),
(17, '2022-09-10', 580.00),
(18, '2022-09-20', 600.50),
(19, '2022-10-01', 620.00),
(20, '2022-10-15', 650.75),
(21, '2022-11-05', 700.00),
(22, '2022-11-15', 750.50),
(23, '2022-12-10', 800.00),
(24, '2022-12-20', 850.75),
(25, '2023-01-05', 160.00), -- Similar to previous Jan
(26, '2023-01-10', 210.50),
(27, '2023-02-15', 190.75),
(28, '2023-02-20', 230.00),
(29, '2023-03-10', 260.00),
(30, '2023-03-20', 310.50),
(31, '2023-04-01', 290.00),
(32, '2023-04-15', 330.75),
(33, '2023-05-05', 360.00),
(34, '2023-05-15', 410.50),
(35, '2023-06-10', 430.00),
(36, '2023-06-20', 460.75),
(37, '2023-07-01', 490.00),
(38, '2023-07-15', 510.50),
(39, '2023-08-05', 530.00),
(40, '2023-08-15', 560.75),
(41, '2023-09-10', 590.00),
(42, '2023-09-20', 610.50),
(43, '2023-10-01', 630.00),
(44, '2023-10-15', 660.75),
(45, '2023-11-05', 710.00),
(46, '2023-11-15', 760.50),
(47, '2023-12-10', 810.00),
(48, '2023-12-20', 860.75);

-- Now, let's analyze this data to find seasonal patterns.
-- The core idea is to aggregate sales by month and then compare these monthly totals across different years.

-- Step 1: Extract the month from the sale_date.
-- We use the EXTRACT function to get the numerical representation of the month (1 for January, 12 for December).
-- This allows us to group sales by month.

-- Step 2: Aggregate total sales for each month and year.
-- We use SUM(amount) to calculate the total sales for each group.
-- The GROUP BY clause is crucial here: it tells SQL to group rows that have the same 'sale_month' and 'sale_year'.
-- This gives us a clear view of monthly performance over time.

SELECT
    EXTRACT(YEAR FROM sale_date) AS sale_year, -- Extract the year from the sale date. WHY: To compare sales across different years.
    EXTRACT(MONTH FROM sale_date) AS sale_month, -- Extract the month from the sale date. WHY: To group sales by month and identify seasonality.
    SUM(amount) AS total_monthly_sales -- Calculate the sum of sales for each month and year. WHY: To quantify the sales performance for each period.
FROM
    sales_data -- The table containing our historical sales data.
GROUP BY
    sale_year, sale_month -- Group the results by year and month. WHY: This is essential for aggregating sales for each specific month within each year.
ORDER BY
    sale_year, sale_month; -- Order the results chronologically. WHY: To make it easy to read and compare year-over-year monthly performance.

-- Example Usage and Interpretation:

-- The query above will produce a result set like this (simplified):
-- sale_year | sale_month | total_monthly_sales
-- --------- | ---------- | -------------------
-- 2022      | 1          | 350.50
-- 2022      | 2          | 400.75
-- ...
-- 2022      | 11         | 1450.00
-- 2022      | 12         | 1650.75
-- 2023      | 1          | 370.50
-- 2023      | 2          | 420.00
-- ...

-- To predict future trends, we look for patterns in 'total_monthly_sales' across the 'sale_month'.
-- For instance, if January sales (sale_month = 1) are consistently lower than December sales (sale_month = 12)
-- in multiple years, we can infer a seasonal trend: sales tend to be higher towards the end of the year.

-- Advanced Note: For more robust prediction, you would:
-- 1. Calculate average monthly sales across all years for each month.
-- 2. Use statistical methods (e.g., moving averages, exponential smoothing) which can be implemented in more advanced SQL or with external tools.
-- 3. Account for external factors (e.g., holidays, marketing campaigns) if that data is available.

-- This query provides the foundational step: identifying recurring monthly patterns in your historical data.
-- By observing how 'total_monthly_sales' behaves for each 'sale_month' across different 'sale_year's,
-- you start to uncover hidden trends that can inform future predictions.