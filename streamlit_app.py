"""Streamlit entry point that embeds the live Vercel-hosted portfolio.

This project (Astro + React + Three.js) cannot run natively on Streamlit Cloud,
which only executes Python. The real site is deployed on Vercel; this file just
displays it inside an iframe so a streamlit.app URL also shows the portfolio.

Update VERCEL_URL below once you have your actual Vercel deployment link
(Vercel dashboard -> your project -> the URL under "Domains", ends in .vercel.app).
"""

import streamlit as st

VERCEL_URL = "https://ganesh-portfolio.vercel.app"

st.set_page_config(page_title="Ganesh S - Data Analyst", layout="wide")

st.components.v1.iframe(VERCEL_URL, height=1000, scrolling=True)
