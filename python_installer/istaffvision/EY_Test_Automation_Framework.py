import os
import subprocess
import time
import pyautogui
import json
import tkinter as tk
from PIL import Image, ImageTk

#add the istaffvision_Test_automation_framework_MVP2.json absolute path in pythonpath
pythonpath = r"EY_API_Automation\EY_test_Automation\python_installer\istaffvision\EY_MVP2.json"
class IstaffvisionTestAutomationFramework:

    def image(self):
        root = tk.Tk()
        root.title("istaffvision")
        root.overrideredirect(True)

        # Define the screen dimensions
        screen_width = 550
        screen_height = 580

        # Calculate the x and y coordinates for the window to be in the middle
        x = (root.winfo_screenwidth() // 2) - (screen_width // 2)
        y = (root.winfo_screenheight() // 2) - (screen_height // 2)

        # Set the geometry to open in the middle of the screen
        root.geometry(f"{screen_width}x{screen_height}+{x}+{y - 50}")

        photo = Image.open("BannerEY.png")
        resized_image = photo.resize((screen_width, screen_height))
        converted_image = ImageTk.PhotoImage(resized_image)

        label = tk.Label(root, image=converted_image)
        label.pack()

        root.after(3000, root.destroy)

        root.mainloop()

    def envSetup(self):

        self.image()

        env = ""

        with open(pythonpath,
                  encoding="utf8") as file_object:
            data = json.load(file_object)

        env_Ap = input("Please Enter The Env Of The Application : ")
        parameter = input("Whether you want to provide the parameter or not, please enter 'no' or press 'enter' to use the default value. Otherwise, provide the parameter : ")
        env_App = env_Ap.lower()

        if env_App == "DevEnv".lower():
            env = data.get("primary_env1")
        elif env_App == "QaEnv".lower():
            env = data.get("primary_env2")
        elif env_App == "ProdEnv".lower():
            env = data.get("secondary_env1")
        elif env_App == "UatEnv".lower():
            env = data.get("secondary_env2")
        else:
            print("sorry you have entered the incorrect env of the application")
            raise ValueError(f"{env_App} is invalid")
        # Path to the shortcut file - to be configured in property file, data file
        shortcut_path = data["shortcut_path"]

        # # # Check if the shortcut file exists
        time.sleep(data.get("time_interval"))
        if os.path.exists(shortcut_path):
            subprocess.Popen(shortcut_path)
            time.sleep(data.get("time_interval"))
        else:
            print("Shortcut not found!")
            exit()

        # # sleep interval value to be configured
        time.sleep(data.get("time_interval"))

        try:

            path_directory = data.get("path_directory")

            if path_directory is None or path_directory == "":
                raise ValueError("Error: Invalid or missing path directory in JSON data.")

            else:
                pyautogui.typewrite(path_directory, interval=0.0)
                pyautogui.press("enter")
                time.sleep(data.get("time_interval"))


            if env is None or env == "":
                raise ValueError("Error: Invalid or missing env in JSON data.")
            else:
                pyautogui.typewrite(env, interval=0.0)  
                pyautogui.press("enter")
                time.sleep(data.get("time_interval"))

            if parameter.lower() == 'no' or parameter == "":
                pyautogui.typewrite(data.get('run'), interval=0.0)
            else:
                pyautogui.typewrite(data.get('run') + " " + parameter, interval=0.0)
            pyautogui.press("enter")


        except pyautogui.FailSafeException:
            print("Error: PyAutoGUI fail-safe triggered. Script terminated.")
        except Exception as e:
            print("Error:", e)













