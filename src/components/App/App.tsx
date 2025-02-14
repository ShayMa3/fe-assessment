import React, { useEffect } from 'react';
import './App.css';
import { Header } from '../Header/Header';
import { connect } from 'react-redux';
import { getApiData } from '../../store/actions';
import { SalesBoard } from '../SalesBoard/SalesBoard';
import { RootState } from '../../store/types';
import { AppState } from '../../store/store';
import { Panel } from '../Panel/Panel';
import { RetailSales } from '../RetailSales/RetailSales';

interface IAppProps {
  appState: RootState;
  getApiData: any;
}

const App: React.FC<IAppProps> = (props) => {
  const { appState, getApiData } = props;

  useEffect(function fetchDateOnInit() {
    (async () => {
      try {
        await getApiData();
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retailItem =
    appState.retailItems?.length > 0 ? appState.retailItems[0] : undefined;

  const sales = retailItem
    ? retailItem.sales?.sort(
        (a, b) =>
          new Date(a.weekEnding).getTime() - new Date(b.weekEnding).getTime()
      )
    : undefined;

  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <Panel retailItem={retailItem} />
        <div>
          <RetailSales sales={sales} />
          <SalesBoard sales={sales} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  appState: state.appState,
});

export default connect(mapStateToProps, { getApiData })(App);
