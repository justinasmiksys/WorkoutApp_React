import React from "react";
import { SideBarLeft } from "./components/SideBarLeft/SideBarLeft";
import { SideBarRight } from "./components/SideBarRight/SideBarRight";
import { Middle } from "./components/Middle/Middle";
import { InitialDataProvider } from "./contexts/InitialDataContext";
import { DisplayDataProvider } from "./contexts/DisplayContext";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { MiddleDisplayProvider } from "./contexts/MiddleDisplayContext";
import { ExDetailsProvider } from "./contexts/ExerciseDetailsContext";
import { WorkoutFormProvider } from "./contexts/WorkoutFormContext";

const App = () => {


  return (
    <div className="container-app">
      <AuthProvider>
        <UserProvider>
          <DisplayDataProvider>
            <InitialDataProvider>
              <MiddleDisplayProvider>
                <ExDetailsProvider>
                  <SideBarLeft />
                  <Middle />
                  <WorkoutFormProvider>
                    <SideBarRight />
                  </WorkoutFormProvider>
                </ExDetailsProvider>
              </MiddleDisplayProvider>
            </InitialDataProvider>
          </DisplayDataProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
