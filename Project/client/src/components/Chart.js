import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useStudentsContext } from '../context/StudentsProvider'; // Import the context hook

const MyChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const { students } = useStudentsContext(); // Use the context hook to access the students array

    useEffect(() => {
        // Create an object to store the count of students in each class
        const classCounts = {};
        students.forEach(student => {
            // Increment the count for each class ID
            if (classCounts.hasOwnProperty(student.class_id)) {
                classCounts[student.class_id]++;
            } else {
                classCounts[student.class_id] = 1;
            }
        });

        // Extract class IDs and counts from the object
        const labels = Object.keys(classCounts);
        const data = Object.values(classCounts);

        const ctx = chartRef.current.getContext("2d");

        if (chartInstance.current) {
            chartInstance.current.destroy(); // Destroy previous chart instance
        }

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Number of Students",
                        data: data,
                        backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color with transparency
                        borderColor: "rgba(54, 162, 235, 1)", // Solid blue color
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Number of Students",
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Ensure chart is destroyed when component unmounts
            }
        };
    }, [students]); // Add students to the dependency array

    return <canvas ref={chartRef}/>;
};

export default MyChart;
